import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_UPLOAD_FILE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_file_upload_portal';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
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
                logger.info(`Delete request for deleting an uploaded file from the curator downloads dashboard`);
                logger.info('endpoint: %s', DELETE_UPLOAD_FILE + body.data);
                const _headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    _headers.Authorization = req.headers.authorization;
                }
                deleteSubmissionResponse = await axios.delete(DELETE_UPLOAD_FILE + body.data, {
                    withCredentials: true,
                    headers: _headers,
                });
                res.json(baseResponse('', deleteSubmissionResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`Upload Portal File Deletion in Curator Downloads dashboard was not able to be performed due to an error.`, e);
        res.status(e.response.status).json({ e });
    }
};
