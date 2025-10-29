import React from 'react';
import axios from 'axios';
import logger from '../../lib/logger';
import Metrics from '../../views/Metrics/Metrics';
import { GET_USER_ACTIVITIES, GET_USER_ACTIVITIES_CSV } from '../../constants/apiRoutes';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import { monthAgo, weekAgo } from '../../views/Metrics/Constants/MetricsConstants';
import { format } from 'date-fns';
import Cookies from 'js-cookie';

const MetricsHub = (props) => <Metrics {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Metrics Reports - User Activities';
    const { req } = context;
    let tableRows = {};
    let tableColumns = {};
    let dataFetched = false; // Track if data was successfully fetched
    const reportType = {
        label: 'User Activities',
        value: 'UserActivities',
    };
    //const aggregations = [{label:,value:}]; May add in later
    let { startDate, endDate, time } = context.query;

    if (time === 'LastWeek') {
        startDate = weekAgo;
        endDate = format(new Date(), 'yyyy-MM-dd');
    } else if (time === 'LastMonth') {
        startDate = monthAgo;
        endDate = format(new Date(), 'yyyy-MM-dd');
    } else if (time === 'AllTime') {
        startDate = format(new Date('December 01, 2019 00:00:01'), 'yyyy-MM-dd');
        endDate = format(new Date(), 'yyyy-MM-dd');
    }

    logger.info('Checking if query has been submitted by user.');
    if (startDate !== undefined || endDate !== undefined) {
        // If we have the date range, get the data
        logger.info(
            'Query Submitted - Calling Metrics for User Activities at : %s',
            GET_USER_ACTIVITIES.replace('[startDate]', startDate).replace('[endDate]', endDate)
        );

        try {
            const getUserActivitiesResponse = await axios.get(
                GET_USER_ACTIVITIES.replace('[startDate]', startDate).replace('[endDate]', endDate),
                {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                }
            );

            tableRows = generateMetricsRows(getUserActivitiesResponse.data.metrics);
            tableColumns = getUserActivitiesResponse.data.headers;
            dataFetched = true;
        } catch (e) {
            logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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
    } else {
        logger.info('User has not submitted a query yet.');
    }

    // Check if data was fetched and if tableRows/tableColumns are empty
    if (!dataFetched || !tableColumns || Object.keys(tableColumns).length === 0) {
        logger.warn('No user activities data available. Please check that Google Analytics is configured and Report Service is running.');
        return {
            props: {
                tableRows: [],
                tableColumns: [],
                reportType,
                initData: { 
                    time: time || 'Custom', 
                    from: startDate, 
                    to: endDate,
                    noDataMessage: 'No reports available yet. Please check that Google Analytics is configured and Report Service is running and accessible.'
                },
                redirectString: '/metrics/UserActivities',
                CSV_URL: '',
                pageTitle: 'Metrics'
            },
        };
    }

    return {
        props: {
            tableRows,
            tableColumns,
            reportType,
            initData: { time: time || 'Custom', from: startDate, to: endDate },
            redirectString: '/metrics/UserActivities',
            CSV_URL: GET_USER_ACTIVITIES_CSV.replace('[startDate]', startDate).replace('[endDate]', endDate),
            pageTitle: 'Metrics'
        },
    };
}

export default MetricsHub;
