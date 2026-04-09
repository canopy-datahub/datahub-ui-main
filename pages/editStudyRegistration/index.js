import React from 'react';
import logger from '../../lib/logger';
import StudyRegistrationEdit from '../../views/StudyRegistration/StudyEdit/StudyRegistrationEdit';
import axios from 'axios';
import { GET_CODELISTS } from '../../constants/apiRoutes';

const StudyRegistrationEditPage = (props) => <StudyRegistrationEdit {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Registration - Curator View';
    const { req, query } = context;
    const { studyId, newStudy, userRole, status } = query;

    // Handle new study creation - return empty form
    if (newStudy === 'true') {
        logger.info('Creating new study registration with empty form');

        let codeLists;
        // Still need to get codelists for dropdown options
        try {
            const codeListResponse = await axios.get(GET_CODELISTS, {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            codeLists = codeListResponse.data;
        } catch (e) {
            logger.error(`Get Codelists call failed: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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

        const codeListsValues = {};
        for (const codeList in codeLists) {
            codeListsValues[codeList] = [];
            codeLists[codeList].map((string) => {
                return codeListsValues[codeList].push({ label: string, value: string });
            });
        }

        return {
            props: {
                type: userRole === 'center' ? 'Center' : 'Curator',
                studyInfo: null, // No existing study info for new study
                formData: {}, // Empty form data
                codeListsValues,
                pageTitle: 'Study Registration',
                isNewStudy: true, // Flag to indicate this is a new study
                status
            },
        };
    }

    // Editing existing studies
    if (!studyId) {
        return {
            redirect: {
                destination: `/${userRole}/studyRegistration`,
            },
        };
    }

    // GET_CODELISTS is a public endpoint (no auth required) — safe to call from SSR
    let codeLists;
    logger.info('Calling GET_CODELISTS for study: ', studyId);
    try {
        const codeListResponse = await axios.get(GET_CODELISTS, {
            withCredentials: true,
            headers: { Cookie: req.headers.cookie },
        });
        codeLists = codeListResponse.data;
    } catch (e) {
        logger.error(`Get Codelists call failed: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return { redirect: { destination: `/${e?.response?.status}` } };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return { redirect: { destination: `/?e=${e?.response?.status}` } };
        }
    }

    const codeListsValues = {};
    for (const codeList in codeLists) {
        codeListsValues[codeList] = [];
        codeLists[codeList].map((string) => {
            return codeListsValues[codeList].push({ label: string, value: string });
        });
    }

    // studyInfo is fetched client-side (requires auth JWT)
    return {
        props: {
            type: userRole === 'center' ? 'Center' : 'Curator',
            studyInfo: null,
            formData: {},
            codeListsValues,
            pageTitle: 'Study Registration',
            isNewStudy: false,
            studyId: studyId || null,
            status
        },
    };
}

export default StudyRegistrationEditPage;
