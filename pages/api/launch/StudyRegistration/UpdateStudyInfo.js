import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse, errorResponse } from '../../../../lib/baseResponse';
import { GET_STUDY_ENTITIES, PUT_STUDY_REGISTRATION, UPLOAD_STUDY_REG_DASH } from '../../../../constants/apiRoutes';
import axios from 'axios';
import { matchAndAddDataPoint, processArrayData, addNewStudyDataPoint, processNewStudyArrayData } from '../../../../lib/APIHelpers/studyRegFunctions';

/** The object is a little weird to send this out.
 * {
    "studyId": 231,
    // This is the array with all of the study updates
    "studyPropertyValues": [
        {
            "id": 26834, // needed if we're changing or deleting
            "value": "booz; stanford; renci; edited", // needed if we're adding or changing
            "entityProperty": { // needed if we're adding a new study
                "id": 9,
                "name": "multi_center_sites"
            },
            "valueIndex": null, // don't know if we need to actually track this
            "shouldBeRemoved": false // needed to be true if we are deleting it
        }
    ]
}
 */

export default async (req, res) => {
    logger.defaultMeta.service = 'Study Registration - CURATOR';
    const {
        body,
        query: { userType, shouldSubmit },
    } = req;
    const { formFields, originalFields, dirtyFields, isNewStudy } = body;
    const id = req.query?.studyId !== undefined ? req.query?.studyId : originalFields?.studyId;
    let studyRegistrationResponse;
    try {
        await BaseMiddleware(req, res);

        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT': {
                // Get entity properties for field mapping (common for both new and existing studies)
                let entityResponse;
                logger.info('GET call for Entity IDs');
                entityResponse = await axios.get(GET_STUDY_ENTITIES, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                
                if (!entityResponse?.data || entityResponse?.status !== 200) {
                    logger.error(`Could not fetch study entities`);
                    res.json(errorResponse('Could not fetch study property IDs.', entityResponse?.data));
                    return;
                }

                // Handle new study creation
                if (isNewStudy) {
                    logger.info('Creating new study registration');
                    
                    // Create new study payload with only studyPropertyValues
                    const newStudyPayload = { 
                        studyId: null,
                        studyPropertyValues: [] 
                    };
                    
                    logger.info(`Processing form fields for new study creation`);
                    
                    // Process all dirty fields for new study
                    for (const dirtyField in dirtyFields) {
                        if (formFields[dirtyField] !== null && formFields[dirtyField] !== undefined && formFields[dirtyField] !== '') {
                            if (Array.isArray(formFields[dirtyField])) {
                                let tempArray = [...formFields[dirtyField]]; // Create copy to avoid mutation
                                processNewStudyArrayData(dirtyField, tempArray, newStudyPayload, formFields, entityResponse?.data);
                            } else {
                                addNewStudyDataPoint(dirtyField, newStudyPayload, formFields, entityResponse?.data);
                            }
                        }
                    }
                    
                    logger.info(`Sending new study creation request to backend`);
                    
                    // Call backend to create new study using UPLOAD_STUDY_REG_DASH
                    studyRegistrationResponse = await axios.post(
                        UPLOAD_STUDY_REG_DASH, 
                        newStudyPayload,
                        {
                            withCredentials: true,
                            headers: {
                                Cookie: req.headers.cookie,
                            },
                        }
                    );
                    
                    if (studyRegistrationResponse?.data && studyRegistrationResponse?.status === 201) {
                        logger.info(`New study created successfully`);
                        res.json(baseResponse(studyRegistrationResponse?.data?.message || 'Study successfully created', studyRegistrationResponse?.data));
                    } else {
                        logger.error(`Something went wrong with creating new study`);
                        res.json(errorResponse('ERROR: Could not create new study', studyRegistrationResponse?.data));
                    }
                    return;
                }
                
                // Existing logic for updating existing studies
                const { studyId } = originalFields;
                // cache length of array for quicker access later.
                const resetLength = originalFields.studyPropertyValues.length;
                const studyUpdate = { studyId: originalFields.studyId, studyPropertyValues: [] };
                let i = resetLength;
                let studyUpdateResponse;
                
                if (entityResponse?.data && entityResponse?.status === 200) {
                    logger.info(`Got Entities for Study`);
                } else {
                    logger.error(`Something went wrong with getting entities for Study ${studyId}`);
                    res.json(errorResponse('Could not fetch study property IDs.', studyUpdateResponse?.data));
                }
                logger.info(`processing form fields for Study ${studyId}`);

                // edit originalFields with dirtyFields
                for (const dirtyField in dirtyFields) {
                    if (Array.isArray(formFields[dirtyField])) {
                        let tempArray = formFields[dirtyField];
                        // for each element, search to see if the element exists already
                        processArrayData(dirtyField, tempArray, originalFields, studyUpdate, formFields, i, entityResponse?.data);
                        // set to true TODO: refactor later
                    } else {
                        matchAndAddDataPoint(dirtyField, originalFields, studyUpdate, formFields, i, entityResponse?.data);
                    }
                    i = resetLength;
                }
                logger.info(`Sending update for Study ${studyId} to the backend`);
                studyUpdateResponse = await axios.put(
                    `${PUT_STUDY_REGISTRATION.replace('[userType]', userType)}${shouldSubmit}`,
                    studyUpdate,
                    {
                        withCredentials: true,
                        headers: { Cookie: req.headers.cookie },
                    }
                );
                if (studyUpdateResponse?.data && studyUpdateResponse?.status === 200) {
                    logger.info(`Study ${studyId} has been updated by a curator.`);
                } else {
                    logger.error(`Something went wrong with PUTting updates to Study ${studyId}`);
                    res.json(errorResponse('ERROR: Could not update study', studyUpdateResponse?.data));
                }
                res.json(baseResponse('', studyUpdateResponse?.data));
                break;
            }
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with ${req.method} on study ${id}`);
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e?.response?.data || e);
        res.status(e?.response?.status).json({ e });
    }
};
