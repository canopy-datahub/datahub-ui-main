import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_PORTAL_STUDIES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_study_portal_studies';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            headers.Authorization = req.headers.authorization;
        }
        const response = await axios.get(GET_PORTAL_STUDIES, { withCredentials: true, headers });
        res.json(baseResponse('', response.data));
    } catch (e) {
        logger.error('Failed to load study portal studies', e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to load studies' });
    }
};
