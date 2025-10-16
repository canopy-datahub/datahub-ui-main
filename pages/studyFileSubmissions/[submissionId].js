import React from 'react';
import StudyFileSubmissionDetailsPage from '../../views/StudyFileSubmissions/StudyFileSubmissionDetailsPage';
import { GET_STUDY_FILE_SUBMISSION_FILES, SUBMISSION_SERVICE_URL } from '../../constants/apiRoutes';
import logger from '../../lib/logger';
import axios from 'axios';
import Cookies from 'js-cookie';

const StudyFileSubmissionsInfo = (props) => <StudyFileSubmissionDetailsPage {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_study_file_submission';
    const { req } = context;
    const { submissionId } = context.query;

    let studySubmissionInfo = {};
    const baseUrl = SUBMISSION_SERVICE_URL;

    logger.info('Calling GET_STUDY_FILE_SUBMISSION_FILES with: %s', `${GET_STUDY_FILE_SUBMISSION_FILES}${submissionId}`);
    try {
        const studySubmissionInfoResponse = await axios.get(`${GET_STUDY_FILE_SUBMISSION_FILES}${submissionId}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studySubmissionInfo = studySubmissionInfoResponse.data;
    } catch (e) {
        logger.error(`GET_STUDY_FILE_SUBMISSION_FILES call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            submissionId,
            studySubmissionInfo,
            baseUrl,
            pageTitle: 'Study File Submission'
        },
    };
}

export default StudyFileSubmissionsInfo;
