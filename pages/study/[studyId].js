import React from 'react';
import StudyOverview from '../../views/StudyOverview/StudyOverview';
import { GET_STUDY, GET_STUDY_DOCUMENTS, GET_STUDY_DATASETS, GET_PROPERTIES, BASE_URL } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const StudyOverviewPage = (props) => <StudyOverview {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'pages_study_overview';
    const { req } = context;
    const { studyId } = context.query;
    // const baseUrl = process.env.DEV_URL;
    const baseUrl = BASE_URL;
    let studyData, studyDocuments, studyDatasets;

    // GET Study
    logger.info('Calling GET_STUDY with : %s', GET_STUDY + studyId);
    try {
        const searchResponse = await axios.get(GET_STUDY + studyId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyData = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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

    // GET Study Documents
    logger.info('Calling GET_STUDY_DOCUMENTS with : %s', GET_STUDY_DOCUMENTS + studyId);
    try {
        const searchResponse = await axios.get(GET_STUDY_DOCUMENTS + studyId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyDocuments = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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

    // GET Study Datasets
    logger.info('Calling GET_STUDY_DATASETS with : %s', GET_STUDY_DATASETS + studyId);
    try {
        const searchResponse = await axios.get(GET_STUDY_DATASETS + studyId, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyDatasets = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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
            studyId,
            studyData,
            studyDocuments,
            studyDatasets,
            baseUrl,
            pageTitle: 'Study Overview'
        },
    };
}

export default StudyOverviewPage;
