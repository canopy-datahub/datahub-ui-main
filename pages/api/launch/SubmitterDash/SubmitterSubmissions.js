import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_SUBMITTER_SUBMISSIONS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_submitter_submissions';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const status = req.query.status || 'in_progress';
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const response = await axios.get(`${GET_SUBMITTER_SUBMISSIONS}?status=${status}`, {
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
        logger.error('Something went wrong with get_submitter_submissions', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
