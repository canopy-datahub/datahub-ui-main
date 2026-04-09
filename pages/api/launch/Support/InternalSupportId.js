import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_SUPPORT_REQUEST_BY_ID_INTERNAL, GET_ALL_SUPPORT_STATUSES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'internal_support_request_by_id';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { supportId } = req.query;

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        const [ticketRes, statusesRes] = await Promise.allSettled([
            axios.get(`${GET_SUPPORT_REQUEST_BY_ID_INTERNAL}${supportId}`, {
                withCredentials: true,
                headers: _headers,
            }),
            axios.get(GET_ALL_SUPPORT_STATUSES, {
                withCredentials: true,
                headers: _headers,
            }),
        ]);

        if (ticketRes.status === 'rejected') {
            const status = ticketRes.reason?.response?.status || 500;
            return res.status(status).json({ message: 'Failed to load support ticket' });
        }

        const requestInfoById = ticketRes.value.data;
        const supportStatuses = statusesRes.status === 'fulfilled' ? statusesRes.value.data : [];

        res.status(200).json(baseResponse('', { requestInfoById, supportStatuses }));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to load support ticket' });
    }
};
