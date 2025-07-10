import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_SUPPORT_REQUEST } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_support_request';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let supportResponse = [];
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for submitting a support request`);
                supportResponse = await axios.post(POST_SUPPORT_REQUEST, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (supportResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', supportResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with post_support_request`, e);
        res.status(e.response.status).json({ e });
    }
};
