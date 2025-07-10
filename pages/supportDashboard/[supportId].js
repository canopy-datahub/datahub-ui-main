/* eslint-disable camelcase */
import SupportRequestInfoPage from '../../views/SupportDashboard/[SupportId]';
import logger from '../../lib/logger.js';
import {
    GET_SUPPORT_REQUEST_BY_ID,
    GET_ALL_SUPPORT_STATUSES,
    GET_ALL_SUPPORT_SEVERITY,
    GET_ALL_SUPPORT_RESOLUTION_TYPES,
    GET_REQUEST_TYPES,
    GET_ALL_ASSIGNEES,
} from '../../constants/apiRoutes.js';
import axios from 'axios';
import { formatSnakeCase } from '../../lib/componentHelpers/SupportFunctions/formatSnakeCase';
import Cookies from 'js-cookie';

const SupportRequestPage = (props) => <SupportRequestInfoPage {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_support_request_by_id';
    const { params, req } = context;
    let requestInfoById = {};
    const supportSeverity = [];
    const supportResolutionTypes = [];
    const supportRequestTypes = [];
    const supportStatuses = [];
    const supportAssignees = [];

    logger.info('Calling GET_SUPPORT_REQUEST_BY_ID with: %s', GET_SUPPORT_REQUEST_BY_ID);
    try {
        const getSupportRequestByIdResponse = await axios.get(`${GET_SUPPORT_REQUEST_BY_ID}${params.supportId}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        requestInfoById = getSupportRequestByIdResponse.data;
    } catch (e) {
        logger.error(`Error with GET_SUPPORT_REQUEST_BY_ID: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            if (e?.response?.status === 401) {
                Cookies.remove('chocolateChip');
            }
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    logger.info('Calling GET_ALL_SUPPORT_STATUSES with: %s', GET_ALL_SUPPORT_STATUSES);
    try {
        const getAllSupportStatuses = await axios.get(`${GET_ALL_SUPPORT_STATUSES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllSupportStatuses.data.forEach((obj) => {
            const setup = {
                label: formatSnakeCase(obj),
                value: obj,
            };
            supportStatuses.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_STATUSES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    logger.info('Calling GET_ALL_SUPPORT_SEVERITY with: %s', GET_ALL_SUPPORT_SEVERITY);
    try {
        const getAllSupportSeverity = await axios.get(`${GET_ALL_SUPPORT_SEVERITY}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllSupportSeverity.data.forEach((obj) => {
            const setup = {
                label: obj,
                value: obj,
            };
            supportSeverity.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_SEVERITY: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    logger.info('Calling GET_ALL_SUPPORT_RESOLUTION_TYPES with: %s', GET_ALL_SUPPORT_RESOLUTION_TYPES);
    try {
        const getAllSupportResolutionTypes = await axios.get(`${GET_ALL_SUPPORT_RESOLUTION_TYPES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllSupportResolutionTypes.data.forEach((obj) => {
            const setup = {
                label: obj,
                value: obj,
            };
            supportResolutionTypes.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_RESOLUTION_TYPES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    logger.info('Calling GET_REQUEST_TYPES with: %s', GET_REQUEST_TYPES);
    try {
        const getAllSupportRequestTypes = await axios.get(`${GET_REQUEST_TYPES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllSupportRequestTypes.data.forEach((obj) => {
            const setup = {
                label: obj,
                value: obj,
            };
            supportRequestTypes.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_REQUEST_TYPES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    logger.info('Calling GET_ALL_ASSIGNEES with: %s', GET_ALL_ASSIGNEES);
    try {
        const getAllAssignee = await axios.get(`${GET_ALL_ASSIGNEES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllAssignee.data.forEach((obj) => {
            const setup = {
                label: `${obj.firstName} ${obj.lastName} (${obj.email})`,
                value: obj.id,
            };
            supportAssignees.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_ALL_ASSIGNEES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    return {
        props: {
            requestInfoById,
            supportStatuses,
            supportSeverity,
            supportResolutionTypes,
            supportRequestTypes,
            supportAssignees,
            pageTitle: 'Support Request'
        },
    };
}

export default SupportRequestPage;
