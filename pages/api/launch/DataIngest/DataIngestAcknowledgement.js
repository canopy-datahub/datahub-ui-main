import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_DI_ACKNOWLEDGEMENT } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_acknowledgement';
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let acknowledgementResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for acknowledgements from validation in data ingest form`);
                acknowledgementResponse = await axios.post(`${POST_DI_ACKNOWLEDGEMENT}${body.submit}`, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', acknowledgementResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`There was an error while making a request to the acknowledgement endpoint for data ingest form`, e);
        res.status(e.response.status).json({ e });
    }
};
