import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_HUB_CONTENT } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_hub_content_metrics';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const { aggBy, reportId } = req.query;
                const url = GET_HUB_CONTENT.replace('[aggBy]', aggBy).replace('[reportId]', reportId);
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
        logger.error('Something went wrong with get_hub_content_metrics', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
