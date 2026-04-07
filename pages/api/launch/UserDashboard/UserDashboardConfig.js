import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import {
    GET_ALL_USER_ROLES,
    GET_APPROVED_INSTITUTIONS,
    GET_ALL_GENERAL_STATUSES,
    GET_RESEARCHER_LEVELS,
    GET_CENTERS,
} from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_user_dashboard_config';

    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET': {
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                const opts = { withCredentials: true, headers };

                const [rolesRes, institutionsRes, statusesRes, levelsRes, centersRes] = await Promise.all([
                    axios.get(GET_ALL_USER_ROLES, opts),
                    axios.get(GET_APPROVED_INSTITUTIONS, opts),
                    axios.get(GET_ALL_GENERAL_STATUSES, opts),
                    axios.get(GET_RESEARCHER_LEVELS, opts),
                    axios.get(GET_CENTERS, opts),
                ]);

                const userRoleList = rolesRes.data.map((obj) => ({ label: obj.description, value: obj.name }));
                const approvedInstitutions = institutionsRes.data.map((obj) => ({ label: obj.name, value: obj.name }));
                const generalStatuses = statusesRes.data.map((obj) => ({
                    label: obj.charAt(0).toUpperCase() + obj.slice(1),
                    value: obj,
                }));
                const researcherLevels = levelsRes.data.map((obj) => ({ label: obj, value: obj }));
                const dccs = centersRes.data.map((obj) => ({ label: obj.name, value: obj.name }));

                res.json(baseResponse('', { userRoleList, approvedInstitutions, generalStatuses, researcherLevels, dccs }));
                break;
            }
            default:
                res.status(404).end();
        }
    } catch (e) {
        logger.error('Something went wrong with get_user_dashboard_config', e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
