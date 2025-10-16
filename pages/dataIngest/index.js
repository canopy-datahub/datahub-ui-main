import React from 'react';
import DataIngest from '../../views/DataIngest/DataIngest';
import logger from '../../lib/logger';
import { GET_STUDIES, GET_CATEGORIES, GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';
import axios from 'axios';

const DataIngestPage = (props) => <DataIngest {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_studies';
    const { req } = context;
    let studiesData = {};

    logger.info('Calling GET_STUDIES: %s', GET_STUDIES);
    try {
        const studiesResponse = await axios.get(GET_STUDIES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        studiesData = studiesResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }
    logger.defaultMeta.service = 'get_categories';
    let categoriesData = {};
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
    return {
        props: {
            studiesData,
            categoriesData,
            fileUploadSOP: `${process.env.NEXT_PUBLIC_DEV_URL}${GET_RESOURCE_CENTER_BUCKET}test.pdf`,
            pageTitle: 'Data Submission'
        },
    };
}

export default DataIngestPage;
