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

    // Run all 4 API calls in parallel for faster page load
    const cookieHeaders = { withCredentials: true, headers: { Cookie: req.headers.cookie } };

    logger.info('Calling all Variables Explorer APIs in parallel');
    logger.info('  SEARCH_STUDIES: %s', SEARCH_STUDIES + searchQuery + '&size=0');
    logger.info('  GET_FACETS: %s', GET_FACETS + '?type=variable');
    logger.info('  GET_VARIABLES: %s', GET_VARIABLES);
    logger.info('  SEARCH_VARIABLES: %s', SEARCH_VARIABLES + searchQuery);

    const [searchResult, facetResult, variablesListResult, variablesSearchResult] = await Promise.allSettled([
        axios.get(SEARCH_STUDIES + searchQuery + '&size=0', cookieHeaders),
        axios.get(GET_FACETS + '?type=variable', cookieHeaders),
        axios.get(GET_VARIABLES, cookieHeaders),
        axios.get(SEARCH_VARIABLES + searchQuery, { timeout: 8000, ...cookieHeaders }),
    ]);

    // Process search results (study count)
    if (searchResult.status === 'fulfilled') {
        searchResults = searchResult.value.data;
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

    // Process variables list
    if (variablesListResult.status === 'fulfilled') {
        variables = variablesListResult.value.data;
        logger.info('Variables array sample: %s', JSON.stringify(variables.slice(0, 2), null, 2));
    } else {
        const e = variablesListResult.reason;
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return { redirect: { destination: `/${e?.response?.status}` } };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return { redirect: { destination: `/?e=${e?.response?.status}` } };
        }
    }

    // Process variables search results
    if (variablesSearchResult.status === 'fulfilled') {
        const responseData = variablesSearchResult.value.data;
        const hits = responseData.hits;
        variablesResults = hits.hits.map(hit => ({
            ...hit._source,
            id: hit._source.variable,
            name: hit._source.variable_label,
            studies: Array.isArray(hit._source.study_name) && hit._source.study_name.length > 0 
                ? hit._source.study_name.map((name, index) => ({
                    title: name,
                    study_id: Array.isArray(hit._source.study_id) ? hit._source.study_id[index] : null
                }))
                : []
        }));
        variablesTotal = hits.total?.value ?? (typeof hits.total === 'number' ? hits.total : 0);
        
        // Extract aggregations from OpenSearch response
        if (responseData.aggregations) {
            variableAggregations = {};
            Object.keys(responseData.aggregations).forEach(aggName => {
                const agg = responseData.aggregations[aggName];
                if (agg.buckets && Array.isArray(agg.buckets)) {
                    const cleanAggName = aggName.replace(/^filters#/, '');
                    
                    const processedBuckets = agg.buckets.map(bucket => {
                        const nestedAggKey = Object.keys(bucket).find(key => key.startsWith('sterms#'));
                        if (nestedAggKey && bucket[nestedAggKey] && bucket[nestedAggKey].buckets) {
                            return bucket[nestedAggKey].buckets.map(nestedBucket => ({
                                key: nestedBucket.key || null,
                                doc_count: nestedBucket.doc_count || 0
                            }));
                        }
                        return {
                            key: bucket.key || null,
                            doc_count: bucket.doc_count || 0
                        };
                    }).flat();
                    
                    if (processedBuckets.length > 0 && processedBuckets.some(b => b.key !== null)) {
                        variableAggregations[cleanAggName] = processedBuckets;
                    }
                }
            });
        }

        initialQuery.pagination.total = variablesTotal ? { value: variablesTotal } : { value: 0 };
        initialQuery.pagination.totalPages = Math.ceil(initialQuery.pagination.total.value / initialQuery.pagination.size);
        initialQuery.pagination.firstNum = 1 + (parseInt(initialQuery.pagination.page) - 1) * parseInt(initialQuery.pagination.size);
        initialQuery.pagination.secondNum = Math.min(
            parseInt(initialQuery.pagination.page) * parseInt(initialQuery.pagination.size),
            initialQuery.pagination.total.value
        );
    } else {
        logger.error(variablesSearchResult.reason?.response?.data?.message || variablesSearchResult.reason?.response?.data?.detail || variablesSearchResult.reason);
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
