import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_CURATOR_STUDIES, GET_CENTER_STUDIES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_study_registration_studies';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const { role = 'curator', status = 'In Review' } = req.query;
                const endpoint = role === 'center' ? GET_CENTER_STUDIES : GET_CURATOR_STUDIES;
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const response = await axios.get(`${endpoint}?status=${status}`, {
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
        logger.error('Something went wrong with get_study_registration_studies', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
