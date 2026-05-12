import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { PUT_TOP_BANNER_SETTING } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'update_top_banner_setting';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'PUT': {
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const response = await axios.put(PUT_TOP_BANNER_SETTING, req.body, {
                    withCredentials: true,
                    headers,
                });
                res.json(baseResponse('', response.data));
                break;
            }
            default:
                res.status(404).end();
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.message);
        const status = e?.response?.status || 500;
        const body = e?.response?.data || { message: e?.message || 'Internal error' };
        res.status(status).json(body);
    }
};
