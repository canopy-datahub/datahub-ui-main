import React from 'react';
import axios from 'axios';
import logger from '../../lib/logger';
import Metrics from '../../views/Metrics/Metrics';
import { GET_SUBMISSION_ACTIVITIES, GET_SUBMISSION_ACTIVITIES_CSV } from '../../constants/apiRoutes';
import { monthAgo, weekAgo } from '../../views/Metrics/Constants/MetricsConstants';
import { format } from 'date-fns';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import Cookies from 'js-cookie';

const MetricsHub = (props) => <Metrics {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Metrics Reports - Submission Activities';
    const { req } = context;
    let tableRows = {};
    let tableColumns = {};
    const reportType = {
        label: 'Submission Activities',
        value: 'SubmissionActivities',
    };
    const aggregations = [
        { label: 'RADx Program', value: 'dcc' },
        { label: 'Study', value: 'study' },
    ];
    let { startDate, endDate, time, aggBy } = context.query;

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
            GET_SUBMISSION_ACTIVITIES.replace('[startDate]', startDate).replace('[endDate]', endDate).replace('[aggBy]', aggBy)
        );

        try {
            const getUserActivitiesResponse = await axios.get(
                GET_SUBMISSION_ACTIVITIES.replace('[startDate]', startDate).replace('[endDate]', endDate).replace('[aggBy]', aggBy),
                {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                }
            );

            tableRows = generateMetricsRows(getUserActivitiesResponse.data.dtos);
            tableColumns = getUserActivitiesResponse.data.columnNames;
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

    return {
        props: {
            tableRows,
            tableColumns,
            reportType,
            aggregations,
            initData: { time: time || 'Custom', from: startDate, to: endDate, aggregate: context.query.aggBy },
            redirectString: '/metrics/SubmissionActivities',
            CSV_URL: GET_SUBMISSION_ACTIVITIES_CSV.replace('[startDate]', startDate)
                .replace('[endDate]', endDate)
                .replace('[aggBy]', aggBy),
            pageTitle: 'Metrics'
        },
    };
}

export default MetricsHub;
