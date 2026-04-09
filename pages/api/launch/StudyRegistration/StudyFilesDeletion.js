import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_STUDY_FILES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_study_files';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { studyId },
        } = req;
        let deleteSubmissionResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                logger.info(`Delete request for deleting all files for an approved study`);
                logger.info('endpoint: %s', DELETE_STUDY_FILES.replace(`[studyId]`, studyId));
                const deleteFilesHeaders = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    deleteFilesHeaders.Authorization = req.headers.authorization;
                }
                deleteSubmissionResponse = await axios.delete(DELETE_STUDY_FILES.replace(`[studyId]`, studyId), {
                    withCredentials: true,
                    headers: deleteFilesHeaders,
                });
                res.json(baseResponse('', deleteSubmissionResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`Approved Study File Deletion was not able to be performed due to an error.`, e);
        res.status(e.response.status).json({ e });
    }
};
