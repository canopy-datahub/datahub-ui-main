import React from 'react';
import DataIngest from '../../views/DataIngest/DataIngest';
import logger from '../../lib/logger';
import { GET_SUBMISSION_INFO, GET_UPLOADED_FILES, GET_CATEGORIES, GET_BUNDLES, GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';
import axios from 'axios';
import Cookies from 'js-cookie';

const DataIngestSubmission = (props) => <DataIngest {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_submission_info';
    const { params, req } = context;
    const baseUrl = process.env.DEV_URL;
    let submissionData = {};
    let uploadedFilesData = {};
    let categoriesData = {};
    let bundlesData = {};
    let reviewBundlesData = {};
    let reviewStudyData = {};
    const submissionId = params.id;
    logger.info('Calling GET_SUBMISSION_INFO: %s', GET_SUBMISSION_INFO + `${params.id}`);
    try {
        const submissionInfoResponse = await axios.get(GET_SUBMISSION_INFO + `${params.id}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        submissionData = submissionInfoResponse.data;
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
    logger.info('Calling GET_UPLOADED_FILES: %s', GET_UPLOADED_FILES + `${params.id}`);
    try {
        const uploadedFilesResponse = await axios.get(GET_UPLOADED_FILES + `${params.id}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        uploadedFilesData = uploadedFilesResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }
    logger.defaultMeta.service = 'get_categories';
    if (submissionData?.id === 2) {
        logger.info('Calling GET_CATEGORIES: %s', GET_CATEGORIES);
        try {
            const categoriesResponse = await axios.get(GET_CATEGORIES, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            categoriesData = categoriesResponse.data;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        }
        logger.info('Calling GET_BUNDLES: %s', GET_BUNDLES + params.id);
        try {
            const bundlesResponse = await axios.get(GET_BUNDLES + params.id, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            bundlesData = bundlesResponse.data;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        }
    }
    if (submissionData?.id === 3) {
        logger.info('Calling GET_CATEGORIES: %s', GET_CATEGORIES);
        try {
            const categoriesResponse = await axios.get(GET_CATEGORIES, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            categoriesData = categoriesResponse.data;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        }
    }
    if (submissionData?.id === 4) {
        logger.info('Calling GET_BUNDLES review and submit: %s', GET_BUNDLES + params.id);
        try {
            const reviewBundlesResponse = await axios.get(GET_BUNDLES + params.id, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            reviewBundlesData = reviewBundlesResponse.data;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        }
        logger.info('Calling GET_UPLOADED_FILES review and submit: %s', GET_UPLOADED_FILES + `${params.id}`);
        try {
            const studyDataReviewResponse = await axios.get(GET_UPLOADED_FILES + `${params.id}`, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            reviewStudyData = studyDataReviewResponse.data;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        }
    }
    if (submissionData?.id === 5) {
        return {
            redirect: {
                destination: `/submitterDashboard`,
            },
        };
    }
    return {
        props: {
            submissionData,
            uploadedFilesData,
            categoriesData,
            submissionId,
            bundlesData,
            reviewBundlesData,
            reviewStudyData,
            baseUrl,
            fileUploadSOP: `${process.env.DEV_URL}${GET_RESOURCE_CENTER_BUCKET}File_Upload_SOP.pdf`,
            pageTitle: 'Data Submission'
        },
    };
}

export default DataIngestSubmission;
