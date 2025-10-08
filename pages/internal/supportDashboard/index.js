import React from 'react';
import logger from '../../../lib/logger';
import { GET_ALL_SUPPORT_REQUEST, GET_INTERNAL_SUPPORT_REQUEST_REPORT } from '../../../constants/apiRoutes';
import axios from 'axios';
import InternalDashboard from '../../../views/Internal/InternalDashboard';
import Cookies from 'js-cookie';

const InternalDashboardPage = (props) => <InternalDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_support_dashboard';
    const { req } = context;
    let getSupportTracker = {};

    try {
        const getSupportDashboardResponse = await axios.get(`${GET_ALL_SUPPORT_REQUEST}all`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getSupportTracker = getSupportDashboardResponse.data;
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
            getSupportTracker,
            downloadCSV: `${process.env.NEXT_PUBLIC_DEV_URL}${GET_INTERNAL_SUPPORT_REQUEST_REPORT}`,
            pageTitle: 'Support Requests Dashboard'
        },
    };
}

export default InternalDashboardPage;
