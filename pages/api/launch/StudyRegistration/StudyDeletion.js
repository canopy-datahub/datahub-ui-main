import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_STUDY } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_study';

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
                logger.info(`Delete request for deleting a study`);
                logger.info('endpoint: %s', DELETE_STUDY.replace(`[studyId]`, studyId));
                deleteSubmissionResponse = await axios.delete(DELETE_STUDY.replace(`[studyId]`, studyId), {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', deleteSubmissionResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`Study Deletion was not able to be performed due to an error.`, e);
        res.status(e.response.status).json({ e });
    }
};
