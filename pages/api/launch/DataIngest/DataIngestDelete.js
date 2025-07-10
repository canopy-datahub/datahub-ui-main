import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_DI_FILE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_data_ingest_file';

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
                logger.info('endpoint: %s', DELETE_DI_FILE + body.data);
                deleteFileResponse = await axios.delete(DELETE_DI_FILE + body.data, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', deleteFileResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`File Deletion in Data Ingest form was not able to be performed due to an error.`, e);
        res.status(e.response.status).json({ e });
    }
};
