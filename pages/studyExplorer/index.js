import React from 'react';
import StudyExplorer from '../../views/StudyExplorer/StudyExplorer';
import { GET_FACETS, GET_PROPERTIES, SEARCH_STUDIES } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';
import { queryHelper } from '../../lib/pageHelpers/queryHelper';

const StudyBrowserPage = (props) => <StudyExplorer {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Explorer';
    const { req, query } = context;
    if (!query?.size || typeof query?.size === "string") {
        query.size = '50';
    }
    if (!query?.page) {
        query.page = '1';
    }

    // initialQuery will load into all of the other components
    const initialQuery = queryHelper(query);

    let searchQuery = '?';
    for (const key in query) {
        if (key === 'view') {
            initialQuery.view = query[key];
            continue;
        }
        // get rid of any escapes for objects, or else Facets will break atm
        query[key] = query[key].replace('\\', '');
        searchQuery += '&' + key + '=' + encodeURIComponent(query[key]);
    }
    let searchResults; let facetList; let properties = [];

    //sanitize query for vulnerability issue
    searchQuery = searchQuery.replace(/([.*;+^$[\]\\(){}])/g, '')

    logger.info('Calling SEARCH_STUDIES with : %s', SEARCH_STUDIES + searchQuery);
    try {
        const searchResponse = await axios.get(SEARCH_STUDIES + searchQuery, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        searchResults = searchResponse.data;
        initialQuery.pagination.total = searchResults.hits.total;
        initialQuery.pagination.totalPages = Math.ceil(initialQuery.pagination.total.value / initialQuery.pagination.size);
        initialQuery.pagination.firstNum = 1 + (parseInt(initialQuery.pagination.page) - 1) * parseInt(initialQuery.pagination.size);
        initialQuery.pagination.secondNum = Math.min(
            parseInt(initialQuery.pagination.page) * parseInt(initialQuery.pagination.size),
            initialQuery.pagination.total.value
        );
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Facets
    logger.info('Calling GET_FACETS at : %s', GET_FACETS);
    try {
        const facetResponse = await axios.get(GET_FACETS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        facetList = facetResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Facets
    logger.info('Calling GET_PROPERTIES at : %s', GET_PROPERTIES);
    try {
        const propertyResponse = await axios.get(GET_PROPERTIES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        properties = propertyResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    return {
        props: {
            searchResults,
            facetList,
            properties,
            initialQuery,
            CSV_URL: `${SEARCH_STUDIES}/csv${searchQuery}`,
            pageTitle: 'Study Explorer',
        },
    };
}

export default StudyBrowserPage;
