import React from 'react';
import SubmitterDashboard from '../../views/SubmitterDashboard/Components/SubmitterDashboard';
import logger from '../../lib/logger';
import { GET_RESOURCE_CENTER_BUCKET, GET_SUBMITTER_SUBMISSIONS, BASE_URL } from '../../constants/apiRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';

const SubmitterDashboardPage = (props) => <SubmitterDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_submitter_dashboard_submissions';
    const { req, query } = context;
    let submissionsData = [];
    const status = query.status || 'in_progress';
    const baseUrl = BASE_URL;

    logger.info('Calling GET_SUBMITTER_SUBMISSIONS with: %s', `${GET_SUBMITTER_SUBMISSIONS}?status=${status}`);
    try {
        const submitterDashboardResponse = await axios.get(`${GET_SUBMITTER_SUBMISSIONS}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        submissionsData = submitterDashboardResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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
            submissionsData,
            status,
            baseUrl,
            fileUploadSOP: `${process.env.NEXT_PUBLIC_DEV_URL}${GET_RESOURCE_CENTER_BUCKET}File_Upload_SOP.pdf`,
            pageTitle: 'Submitter Dashboard'
        },
    };
}

export default SubmitterDashboardPage;
