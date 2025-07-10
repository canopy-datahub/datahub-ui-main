import React from 'react';
import StudyRegistrationDash from '../../../views/StudyRegistration/StudyRegistrationDash/StudyRegistrationDash';
import logger from '../../../lib/logger';
import axios from 'axios';
import { GET_DCC_STUDIES } from '../../../constants/apiRoutes';
import Cookies from 'js-cookie';

const StudyRegistrationDCCPage = (props) => <StudyRegistrationDash {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Registration Dashboard - DCC View';
    const { req, query } = context;
    const status = query?.status || 'In Review';
    let studies = [];
    const userRole = 'dcc';

    logger.info('Calling GET_DCC_STUDIES with: %s', `${GET_DCC_STUDIES}?status=${status}`);
    try {
        const studyResponse = await axios.get(`${GET_DCC_STUDIES}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studies = studyResponse?.data;
    } catch (e) {
        logger.error(`GET_DCC_STUDIES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            userRole,
            studies,
            status,
            pageTitle: 'Study Registration Dashboard'
        },
    };
}

export default StudyRegistrationDCCPage;
