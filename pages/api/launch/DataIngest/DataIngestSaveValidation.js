import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_SAVE_VALIDATION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_save_validation';
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let saveResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for saving validation in data ingest form`);
                saveResponse = await axios.post(POST_SAVE_VALIDATION, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', saveResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`There was an error while making a request to save validation endpoint for data ingest form`, e);
        res.status(e.response.status).json({ e });
    }
};
