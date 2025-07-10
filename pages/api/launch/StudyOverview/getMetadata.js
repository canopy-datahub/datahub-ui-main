import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_METADATA_FILE_CONTENT } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_metadata_contents';
    const {
        query: { fileId },
    } = req;

    try {
        await BaseMiddleware(req, res);
        let metadataResponse = [];
        switch (req.method) {
            case `GET`:
                logger.info('Calling GET_METADATA_FILE_CONTENT with: %s', `${GET_METADATA_FILE_CONTENT}${fileId}`);
                metadataResponse = await axios.get(`${GET_METADATA_FILE_CONTENT}${fileId}`, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (metadataResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', metadataResponse.data));
                res.status(200).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status).json({ e });
    }
};
