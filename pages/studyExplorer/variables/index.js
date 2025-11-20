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
        logger.info('Variables array sample: %s', JSON.stringify(variables.slice(0, 2), null, 2));
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
    logger.info('Calling SEARCH_VARIABLES at : %s', SEARCH_VARIABLES + searchQuery);
    try {
        const variablesResultsResponse = await axios.get(SEARCH_VARIABLES + searchQuery, {
            timeout: 8000, // Set timeout to 8 seconds
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        
        // Parse OpenSearch response format
        const responseData = variablesResultsResponse.data;
        const hits = responseData.hits;
        variablesResults = hits.hits.map(hit => ({
            ...hit._source,
            // Map OpenSearch field names to UI expected field names
            id: hit._source.variable,           // variable -> id
            name: hit._source.variable_label,   // variable_label -> name
            // datatype already matches
            // Handle study_name and study_id as arrays
            studies: Array.isArray(hit._source.study_name) && hit._source.study_name.length > 0 
                ? hit._source.study_name.map((name, index) => ({
                    title: name,
                    study_id: Array.isArray(hit._source.study_id) ? hit._source.study_id[index] : null
                }))
                : []
        }));
        // Use nullish coalescing to handle when value is 0
        variablesTotal = hits.total?.value ?? (typeof hits.total === 'number' ? hits.total : 0);
        
        // Extract aggregations from OpenSearch response
        if (responseData.aggregations) {
            variableAggregations = {};
            Object.keys(responseData.aggregations).forEach(aggName => {
                const agg = responseData.aggregations[aggName];
                if (agg.buckets && Array.isArray(agg.buckets)) {
                    const cleanAggName = aggName.replace(/^filters#/, '');
                    
                    const processedBuckets = agg.buckets.map(bucket => {
                        // Handle the nested structure: bucket.sterms#fieldName.buckets
                        const nestedAggKey = Object.keys(bucket).find(key => key.startsWith('sterms#'));
                        if (nestedAggKey && bucket[nestedAggKey] && bucket[nestedAggKey].buckets) {
                            return bucket[nestedAggKey].buckets.map(nestedBucket => ({
                                key: nestedBucket.key || null,
                                doc_count: nestedBucket.doc_count || 0
                            }));
                        }
                        // Fallback for direct bucket structure
                        return {
                            key: bucket.key || null,
                            doc_count: bucket.doc_count || 0
                        };
                    }).flat(); // Flatten the array since we're mapping nested buckets
                    
                    // Only add aggregations that have valid buckets
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

        // Note: Sorting is now handled by OpenSearch service, so we don't need client-side sorting
        // The results are already sorted according to the prop and sort parameters sent to the API
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
