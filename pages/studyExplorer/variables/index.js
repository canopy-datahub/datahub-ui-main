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
    const initialQuery = queryHelper(query, 'variables');

    let searchQuery = '?';

    // variablesBody must have quoted keys for DUG API
    let variablesBody = {
        'query': '',
        'index': 'variables_index',
        'concept': '',
        'offset': 0,
        'size': 7000,
    };

    for (const key in query) {
        if (key === 'view') {
            initialQuery.view = query[key];
            continue;
        }
        // get rid of any escapes for objects, or else Facets will break atm
        query[key] = query[key].replace(/:\\/g, '');

        if (key === 'q') {
            //sanitize query for vulnerability issue
            query[key] = query[key].replace(/([.*;:+^$[\]\\(){}])/g, '');  

            variablesBody['query'] = encodeURIComponent(query[key]);
            searchQuery += '&' + key + '=' + encodeURIComponent(query[key]);
        }
        if (key === 'facets') {
            const formattedFacets = JSON.parse(query[key])?.map(item => ({
                key: item.name,
                value: item.facets
            }));

            variablesBody['filter'] = formattedFacets;
        }
    }
    let searchResults = []; let facetList = []; let properties = []; let variablesTotal = 0; let variablesResults = []; let variables = []; let variableAggregations = {};

    const variablesProperties = [
        {
            displayLabel: 'Variables Name',
            entityPropertyName: 'id',
        },
        {
            displayLabel: 'Label',
            entityPropertyName: 'name',
        },
        {
            displayLabel: 'Data Type',
            entityPropertyName: 'datatype',
        },
    ];

    logger.info('Calling SEARCH_STUDIES with : %s', SEARCH_STUDIES + searchQuery + '&size=0');

    try {
        const searchResponse = await axios.get(SEARCH_STUDIES + searchQuery + '&size=0', {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        searchResults = searchResponse.data;
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

    // GET Facets
    logger.info('Calling GET_FACETS at : %s', GET_FACETS);
    try {
        const facetResponse = await axios.get(GET_FACETS + '?type=variable', {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        facetList = facetResponse.data;
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

    // GET Variables
    logger.info('Calling GET_VARIABLES at : %s', GET_VARIABLES);
    try {
        const variablesResponse = await axios.get(GET_VARIABLES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        variables = variablesResponse.data;
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

    // SEARCH Variables
    logger.info('Calling SEARCH_VARIABLES at : %s', SEARCH_VARIABLES);
    try {
        const variablesResultsResponse = await axios.post(SEARCH_VARIABLES, variablesBody, {
            timeout: 8000 // Set timeout to 8 seconds
        });
        variablesResults = variablesResultsResponse.data.variables;
        variableAggregations = variablesResultsResponse.data.agg_counts;
        variablesTotal = variablesResultsResponse.data.total;

        initialQuery.pagination.total = variablesTotal ? { value: variablesTotal } : { value: 0 };
        initialQuery.pagination.totalPages = Math.ceil(initialQuery.pagination.total.value / initialQuery.pagination.size);
        initialQuery.pagination.firstNum = 1 + (parseInt(initialQuery.pagination.page) - 1) * parseInt(initialQuery.pagination.size);
        initialQuery.pagination.secondNum = Math.min(
            parseInt(initialQuery.pagination.page) * parseInt(initialQuery.pagination.size),
            initialQuery.pagination.total.value
        );

        const sortResults = (results, field, order) => {
            return results.sort((a, b) => {
                if (a[field] < b[field]) {
                    return order === 'asc' ? -1 : 1;
                }
                if (a[field] > b[field]) {
                    return order === 'asc' ? 1 : -1;
                }
                return 0;
            });
        };

        if (query.prop === 'relevance') {
            if (query.sort === 'asc') {
                variablesResults.reverse();
            }
        } else {
            // no query.prop in url so use initial sorting as default
            if (!query.prop) {
                const sortedResults = sortResults([...variablesResults], initialQuery.sorting.field, initialQuery.sorting.sort);
                variablesResults = sortedResults;
            } else {
                const sortedResults = sortResults([...variablesResults], query.prop, query.sort);
                variablesResults = sortedResults;
            }
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    return {
        props: {
            searchResults,
            variablesResults,
            variablesTotal,
            facetList,
            variableAggregations,
            variablesProperties,
            variables,
            initialQuery,
            tab: 'variables',
            pageTitle: 'Study Explorer',
        },
    };
}

export default StudyBrowserPage;
