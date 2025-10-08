import React from 'react';
import StudyFileSubmissions from '../../views/StudyFileSubmissions/StudyFileSubmissions';
import { GET_STUDY_FILE_SUBMISSIONS } from '../../constants/apiRoutes';
import logger from '../../lib/logger';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudyFileSubmissionsPage = (props) => <StudyFileSubmissions {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_study_file_submissions';
    const { req, query } = context;
    const status = query?.status || 'in_progress';
    let studyFileSubmissions;

    logger.info('Calling GET_STUDY_FILE_SUBMISSIONS with: %s', `${GET_STUDY_FILE_SUBMISSIONS}?status=${status}`);
    try {
        const studyFileSubmissionResponse = await axios.get(`${GET_STUDY_FILE_SUBMISSIONS}?status=${status}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyFileSubmissions = studyFileSubmissionResponse.data;
    } catch (e) {
        logger.error(`GET_STUDY_FILE_SUBMISSIONS call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            studyFileSubmissions,
            status,
            pageTitle: 'Study File Submissions Dashboard'
        },
    };
}

export default StudyFileSubmissionsPage;
