import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_PUBLIC_SYSTEM_SETTINGS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_public_system_settings';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                // No auth required: the public endpoint is intentionally unauthenticated
                // so anonymous visitors see the banner.
                const response = await axios.get(GET_PUBLIC_SYSTEM_SETTINGS);
                res.json(baseResponse('', response.data));
                break;
            }
            default:
                res.status(404).end();
        }
    } catch (e) {
        logger.error('Something went wrong with get_public_system_settings', e?.message);
        const status = e?.response?.status || 500;
        const body = e?.response?.data || { message: e?.message || 'Internal error' };
        res.status(status).json(body);
    }
};
