import React from 'react';
import StudyPortal from '../../views/StudyPortal/StudyPortal';
import logger from '../../lib/logger';
import { GET_PORTAL_STUDIES, GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';
import axios from 'axios';

const StudyPortalPage = (props) => <StudyPortal {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'study_portal';
    const { req } = context;
    let studies = [];

    logger.info('Calling GET_STUDIES: %s', GET_PORTAL_STUDIES);
    try {
        const studiesResponse = await axios.get(GET_PORTAL_STUDIES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studies = studiesResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    return {
        props: {
            studies,
            fileUploadSOP: `${process.env.NEXT_PUBLIC_DEV_URL}${GET_RESOURCE_CENTER_BUCKET}SOP.pdf`,
            pageTitle: 'Study Portal'
        },
    };
}

export default StudyPortalPage;
