import React from 'react';
import logger from '../../lib/logger';
import StudyRegistrationEdit from '../../views/StudyRegistration/StudyEdit/StudyRegistrationEdit';
import axios from 'axios';
import { GET_CODELISTS, GET_STUDY_VALUES } from '../../constants/apiRoutes';
import Cookies from 'js-cookie';

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

    let codeLists, studyInfo;
    logger.info('Calling GET_STUDY_VALUES for study: ', studyId);

    try {
        const studyDataResponse = await axios.get(GET_STUDY_VALUES.replace('[studyId]', studyId), {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studyInfo = studyDataResponse.data;
    } catch (e) {
        logger.error(`GET_STUDY_VALUES call failed for study ${studyId}: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
    logger.info('Calling GET_CODELISTS for study: ', studyId);
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

    const formData = {};
    for (let i = 0; i < studyInfo.studyPropertyValues.length; i++) {
        // If we already have the entity name in our FormData, that means it will always be a multiSelect or an other, so this needs to be an array
        if (studyInfo.studyPropertyValues[i].entityProperty.name in formData) {
            if (Array.isArray(formData[studyInfo.studyPropertyValues[i].entityProperty.name])) {
                formData[studyInfo.studyPropertyValues[i].entityProperty.name].push(studyInfo.studyPropertyValues[i].value);
            } else {
                formData[studyInfo.studyPropertyValues[i].entityProperty.name] = [
                    formData[studyInfo.studyPropertyValues[i].entityProperty.name],
                    studyInfo.studyPropertyValues[i].value,
                ];
            }
        } else {
            formData[studyInfo.studyPropertyValues[i].entityProperty.name] = studyInfo.studyPropertyValues[i].value;
        }
    }

    return {
        props: {
            type: userRole === 'center' ? 'Center' : 'Curator',
            studyInfo,
            formData,
            codeListsValues,
            pageTitle: 'Study Registration',
            isNewStudy: false,
            status
        },
    };
}

export default StudyRegistrationEditPage;
