import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_USER_ACTIVITIES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_user_activities_metrics';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const { startDate, endDate } = req.query;
                const url = GET_USER_ACTIVITIES
                    .replace('[startDate]', startDate)
                    .replace('[endDate]', endDate);
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const response = await axios.get(url, { withCredentials: true, headers });
                res.json(baseResponse('', response.data));
                break;
            }
            default:
                res.status(404).end();
        }
    } catch (e) {
        logger.error('Something went wrong with get_user_activities_metrics', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
