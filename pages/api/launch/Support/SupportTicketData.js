import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import {
    GET_SUPPORT_REQUEST_BY_ID,
    GET_ALL_SUPPORT_STATUSES,
    GET_ALL_SUPPORT_SEVERITY,
    GET_ALL_SUPPORT_RESOLUTION_TYPES,
    GET_REQUEST_TYPES,
    GET_ALL_ASSIGNEES,
} from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'support_ticket_data';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { supportId } = req.query;

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        const [ticketRes, statusesRes, severityRes, resolutionRes, requestTypesRes, assigneesRes] =
            await Promise.allSettled([
                axios.get(`${GET_SUPPORT_REQUEST_BY_ID}${supportId}`, { withCredentials: true, headers: _headers }),
                axios.get(GET_ALL_SUPPORT_STATUSES, { withCredentials: true, headers: _headers }),
                axios.get(GET_ALL_SUPPORT_SEVERITY, { withCredentials: true, headers: _headers }),
                axios.get(GET_ALL_SUPPORT_RESOLUTION_TYPES, { withCredentials: true, headers: _headers }),
                axios.get(GET_REQUEST_TYPES, { withCredentials: true, headers: _headers }),
                axios.get(GET_ALL_ASSIGNEES, { withCredentials: true, headers: _headers }),
            ]);

        if (ticketRes.status === 'rejected') {
            const status = ticketRes.reason?.response?.status || 500;
            return res.status(status).json({ message: 'Failed to load support ticket' });
        }

        const requestInfoById = ticketRes.value.data;

        const toOptions = (res, map) =>
            res.status === 'fulfilled' ? res.value.data.map(map) : [];

        const supportStatuses = toOptions(statusesRes, (obj) => ({ label: obj.replace(/_/g, ' '), value: obj }));
        const supportSeverity = toOptions(severityRes, (obj) => ({ label: obj, value: obj }));
        const supportResolutionTypes = toOptions(resolutionRes, (obj) => ({ label: obj, value: obj }));
        const supportRequestTypes = toOptions(requestTypesRes, (obj) => ({ label: obj, value: obj }));
        const supportAssignees = toOptions(assigneesRes, (obj) => ({
            label: `${obj.firstName} ${obj.lastName} (${obj.email})`,
            value: obj.id,
        }));

        res.status(200).json(baseResponse('', {
            requestInfoById,
            supportStatuses,
            supportSeverity,
            supportResolutionTypes,
            supportRequestTypes,
            supportAssignees,
        }));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to load support ticket' });
    }
};
