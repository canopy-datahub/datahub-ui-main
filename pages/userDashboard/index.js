import React from 'react';
import UserDashboard from '../../views/UserDashboard/UserDashboard';
import logger from '../../lib/logger';
import {
    GET_ALL_USERS,
    GET_ALL_USER_ROLES,
    GET_APPROVED_INSTITUTIONS,
    GET_ALL_GENERAL_STATUSES,
    GET_RESEARCHER_LEVELS,
    GET_CENTERS,
} from '../../constants/apiRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';

const UserDashboardPage = (props) => <UserDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'manage_user_dashboard';
    const { query, req } = context;
    const status = query?.status || 'active';
    let getUserDashboard = {};
    const userRoleList = [];
    const approvedInstitutions = [];
    const generalStatuses = [];
    const researcherLevels = [];
    const dccs = [];

    logger.info('Calling GET_ALL_USERS with: %s', `${GET_ALL_USERS}${status}`);
    try {
        const getUserDashboardResponse = await axios.get(`${GET_ALL_USERS}${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        getUserDashboard = getUserDashboardResponse.data;
    } catch (e) {
        logger.error(`Error with GET_ALL_USERS: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    logger.info('Calling GET_ALL_USER_ROLES with: %s', GET_ALL_USER_ROLES);
    try {
        const getUserRolesResponse = await axios.get(`${GET_ALL_USER_ROLES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        try {
            getUserRolesResponse.data.forEach((obj) => {
                const setup = {
                    label: obj.description,
                    value: obj.name,
                };
                userRoleList.push(setup);
            });
        } catch (e) {
            logger.error(`Error parsing user role data on User Dashboard ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        }
    } catch (e) {
        logger.error(`Error with GET_ALL_USER_ROLES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    logger.info('Calling GET_APPROVED_INSTITUTIONS with: %s', GET_APPROVED_INSTITUTIONS);
    try {
        const getApprovedInstitutionResponse = await axios.get(`${GET_APPROVED_INSTITUTIONS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        try {
            getApprovedInstitutionResponse.data.forEach((obj) => {
                const setup = {
                    label: obj.name,
                    value: obj.name,
                };

                approvedInstitutions.push(setup);
            });
        } catch (e) {
            logger.error(
                `Error parsing approved institutions on User Dashboard ${e?.response?.data?.message || e?.response?.data?.detail || e}`
            );
        }
    } catch (e) {
        logger.error(`Error with GET_APPROVED_INSTITUTIONS: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    logger.info('Calling GET_ALL_GENERAL_STATUSES with: %s', GET_ALL_GENERAL_STATUSES);
    try {
        const getAllGeneralStatusesResponse = await axios.get(`${GET_ALL_GENERAL_STATUSES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        try {
            getAllGeneralStatusesResponse.data.forEach((obj) => {
                const setup = {
                    label: obj.charAt(0).toUpperCase() + obj.slice(1),
                    value: obj,
                };

                generalStatuses.push(setup);
            });
        } catch (e) {
            logger.error(
                `Error parsing general status data on User Dashboard ${e?.response?.data?.message || e?.response?.data?.detail || e}`
            );
        }
    } catch (e) {
        logger.error(`Error with GET_ALL_GENERAL_STATUSES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    logger.info('Calling GET_RESEARCHER_LEVELS with: %s', GET_RESEARCHER_LEVELS);
    try {
        const getResearcherLevelResponse = await axios.get(`${GET_RESEARCHER_LEVELS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        try {
            getResearcherLevelResponse.data.forEach((obj) => {
                const setup = {
                    label: obj,
                    value: obj,
                };

                researcherLevels.push(setup);
            });
        } catch (e) {
            logger.error(`Error parsing researcher level on User Dashboard ${e}`);
        }
    } catch (e) {
        logger.error(`Error with GET_RESEARCHER_LEVELS: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    logger.info('Calling GET_DCCS with: %s', GET_CENTERS);
    try {
        const getDCCsResponse = await axios.get(`${GET_CENTERS}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        try {
            getDCCsResponse.data.forEach((obj) => {
                const setup = {
                    label: obj.name,
                    value: obj.name,
                };

                dccs.push(setup);
            });
        } catch (e) {
            logger.error(`Error parsing DCCs on User Dashboard ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        }
    } catch (e) {
        logger.error(`Error with GET_RESEARCHER_LEVELS: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            getUserDashboard,
            status,
            userRoleList,
            approvedInstitutions,
            generalStatuses,
            researcherLevels,
            dccs,
            pageTitle: 'Manage Users'
        },
    };
}

export default UserDashboardPage;
