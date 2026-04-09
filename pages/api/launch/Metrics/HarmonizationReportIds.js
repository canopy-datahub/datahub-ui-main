import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_HARMONIZATION_REPORT_IDS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_harmonization_report_ids';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const response = await axios.get(GET_HARMONIZATION_REPORT_IDS, { withCredentials: true, headers });
                res.json(baseResponse('', response.data));
                break;
            }
            default:
                res.status(404).end();
        }
    } catch (e) {
        logger.error('Something went wrong with get_harmonization_report_ids', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
