import React from 'react';
import SupportDashboard from '../../views/SupportDashboard/SupportDashboard';
import logger from '../../lib/logger';
import { GET_ALL_SUPPORT_REQUEST } from '../../constants/apiRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';

const SupportDashboardPage = (props) => <SupportDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_support_dashboard';
    const { query, req } = context;
    const status = query?.status || 'initiated';
    let getSupportDashboard = {};

    logger.info('Calling GET_ALL_SUPPORT_REQUEST with: %s', `${GET_ALL_SUPPORT_REQUEST}${status}`);
    try {
        const getSupportDashboardResponse = await axios.get(`${GET_ALL_SUPPORT_REQUEST}${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        getSupportDashboard = getSupportDashboardResponse.data;
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_REQUEST: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

    return {
        props: {
            getSupportDashboard,
            status,
            pageTitle: 'Manage Support Requests'
        },
    };
}

export default SupportDashboardPage;
