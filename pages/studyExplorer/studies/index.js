import React from 'react';
import StudyExplorer from '../../../views/StudyExplorer/StudyExplorer';
import { GET_FACETS, GET_PROPERTIES, GET_VARIABLES, SEARCH_STUDIES, SEARCH_VARIABLES } from '../../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../../lib/logger';
import { queryHelper } from '../../../lib/pageHelpers/queryHelper';

const StudyBrowserPage = (props) => <StudyExplorer {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Study Explorer';
    const { req, query } = context;
    if (!query?.size || !parseInt(query?.size)) {
        query.size = '50';
    }
    if (!query?.page || !parseInt(query?.page)) {
        query.page = '1';
    }

    // initialQuery will load into all of the other components
    const initialQuery = queryHelper(query);

    let searchQuery = '';

    for (const key in query) {
        if (key === 'view') {
            initialQuery.view = query[key];
            continue;
        }
        // get rid of any escapes for objects, or else Facets will break atm
        query[key] = query[key].replace(/\\/g, '');    
        if (key === 'q') {   
            //sanitize query for vulnerability issue
            query[key] = query[key].replace(/([.*;:+^$[\]\\(){}])/g, '');          
        }              
        
        const separator = searchQuery === '' ? '?' : '&';
        searchQuery += separator + key + '=' + encodeURIComponent(query[key]);
    }

    let searchResults = []; let facetList = []; let properties = []; let variablesTotal = 0; let variablesResults = [];

    // Run all 4 API calls in parallel for faster page load
    const cookieHeaders = { withCredentials: true, headers: { Cookie: req.headers.cookie } };

    logger.info('Calling all Study Explorer APIs in parallel');
    logger.info('  SEARCH_STUDIES: %s', SEARCH_STUDIES + searchQuery);
    logger.info('  GET_FACETS: %s', GET_FACETS);
    logger.info('  GET_PROPERTIES: %s', GET_PROPERTIES);
    logger.info('  SEARCH_VARIABLES: %s', SEARCH_VARIABLES + searchQuery);

    const [searchResult, facetResult, propertyResult, variablesResult] = await Promise.allSettled([
        axios.get(SEARCH_STUDIES + searchQuery, cookieHeaders),
        axios.get(GET_FACETS, cookieHeaders),
        axios.get(GET_PROPERTIES, cookieHeaders),
        axios.get(SEARCH_VARIABLES + searchQuery, { timeout: 8000 }),
    ]);

    // Process search results
    if (searchResult.status === 'fulfilled') {
        searchResults = searchResult.value.data;
        initialQuery.pagination.total = searchResults.hits.total;
        initialQuery.pagination.totalPages = Math.ceil(initialQuery.pagination.total.value / initialQuery.pagination.size);
        initialQuery.pagination.firstNum = 1 + (parseInt(initialQuery.pagination.page) - 1) * parseInt(initialQuery.pagination.size);
        initialQuery.pagination.secondNum = Math.min(
            parseInt(initialQuery.pagination.page) * parseInt(initialQuery.pagination.size),
            initialQuery.pagination.total.value
        );
    } else {
        const e = searchResult.reason;
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return { redirect: { destination: `/${e?.response?.status}` } };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return { redirect: { destination: `/?e=${e?.response?.status}` } };
        }
    }

    // Process facets
    if (facetResult.status === 'fulfilled') {
        facetList = facetResult.value.data;
    } else {
        const e = facetResult.reason;
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return { redirect: { destination: `/${e?.response?.status}` } };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return { redirect: { destination: `/?e=${e?.response?.status}` } };
        }
    }

    // Process properties
    if (propertyResult.status === 'fulfilled') {
        properties = propertyResult.value.data;
    } else {
        const e = propertyResult.reason;
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return { redirect: { destination: `/${e?.response?.status}` } };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return { redirect: { destination: `/?e=${e?.response?.status}` } };
        }
    }

    // Process variables total
    if (variablesResult.status === 'fulfilled') {
        const responseData = variablesResult.value.data;
        const hits = responseData.hits;
        variablesTotal = hits.total?.value ?? (typeof hits.total === 'number' ? hits.total : 0);
        logger.info('Variables total: %s', variablesTotal);
    } else {
        logger.error(variablesResult.reason?.response?.data?.message || variablesResult.reason?.response?.data?.detail || variablesResult.reason);
    }


    return {
        props: {
            searchResults,
            variablesResults,
            variablesTotal,
            facetList,
            properties,
            initialQuery,
            CSV_URL: `${SEARCH_STUDIES}/csv${searchQuery}`,
            tab: 'studies',
            pageTitle: 'Study Explorer',
        },
    };
}

export default StudyBrowserPage;
