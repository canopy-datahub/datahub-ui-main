import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse, errorResponse } from '../../../../lib/baseResponse';
import { GET_STUDY_ENTITIES, PUT_STUDY_REGISTRATION } from '../../../../constants/apiRoutes';
import axios from 'axios';
import { matchAndAddDataPoint, processArrayData } from '../../../../lib/APIHelpers/studyRegFunctions';

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
    const { formFields, originalFields, dirtyFields } = body;
    const id = req.query?.studyId !== undefined ? req.query?.studyId : originalFields?.studyId;
    let studyUpdateResponse;
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
                const { studyId } = originalFields;
                // cache length of array for quicker access later.
                const resetLength = originalFields.studyPropertyValues.length;
                const studyUpdate = { studyId: originalFields.studyId, studyPropertyValues: [] };
                let i = resetLength;
                let entityResponse;
                let studyUpdateResponse;
                logger.info('GET call for Entity IDs');
                entityResponse = await axios.get(GET_STUDY_ENTITIES, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
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
