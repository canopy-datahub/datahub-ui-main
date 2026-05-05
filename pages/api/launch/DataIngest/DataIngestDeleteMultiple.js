import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_MULTIPLE_DI } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_data_ingest_multiple_files';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let deleteFileResponse = [];
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
                logger.info(`Delete request for deleting a file in data ingest form`);
                const fileIds = Array.isArray(body.data) ? body.data : [body.data];
                const queryParams = fileIds.join('&fileIds=');
                logger.info('endpoint: %s', DELETE_MULTIPLE_DI + queryParams);
                const _headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    _headers.Authorization = req.headers.authorization;
                }
                deleteFileResponse = await axios.delete(DELETE_MULTIPLE_DI + queryParams, {
                    withCredentials: true,
                    headers: _headers,
                });
                res.json(baseResponse('', deleteFileResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`File Deletion in Data Ingest form was not able to be performed due to an error.`, e);
        res.status(e.response?.status ?? 500).json({ e });
    }
};
