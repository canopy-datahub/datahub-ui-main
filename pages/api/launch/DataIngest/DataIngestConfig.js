import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_STUDIES, GET_CATEGORIES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'data_ingest_config';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        const [studiesRes, categoriesRes] = await Promise.allSettled([
            axios.get(GET_STUDIES, { withCredentials: true, headers: _headers }),
            axios.get(GET_CATEGORIES, { withCredentials: true, headers: _headers }),
        ]);

        const studiesData = studiesRes.status === 'fulfilled' ? studiesRes.value.data : [];
        const categoriesData = categoriesRes.status === 'fulfilled' ? categoriesRes.value.data : {};

        res.status(200).json(baseResponse('', { studiesData, categoriesData }));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to load data ingest config' });
    }
};
