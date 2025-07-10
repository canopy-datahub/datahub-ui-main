import React from 'react';
import axios from 'axios';
import logger from '../../lib/logger';
import Metrics from '../../views/Metrics/Metrics';
import { GET_HUB_CONTENT, GET_HUB_CONTENT_CSV, GET_REPORT_IDS } from '../../constants/apiRoutes';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import Cookies from 'js-cookie';

const MetricsHub = (props) => <Metrics {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Metrics Reports - Hub Content';
    const { req } = context;
    let { query } = context;
    let dateResponse;

    logger.info('Getting Report ID List : %s', GET_REPORT_IDS);

    try {
        const getReportIDReponse = await axios.get(GET_REPORT_IDS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        dateResponse = getReportIDReponse?.data;
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

    const aggregations = [
        { label: 'RADx Program', value: 'dcc' },
        { label: 'Study', value: 'study' },
    ];

    // Set query params if not initialized
    if (Object.keys(query).length === 0) {
        const latestYearIndex = dateResponse.length - 1;
        const latestMonthIndex = dateResponse[latestYearIndex].months.length - 1;
        const latestReportIDIndex = dateResponse[latestYearIndex].months[latestMonthIndex].reports.length - 1;
        query = { aggBy: 'dcc', yi: latestYearIndex, mi: latestMonthIndex, ri: latestReportIDIndex };
    }

    // grab Year Index, Month Index, and Report Index
    const selectedIDs = { year: query?.yi, month: query?.mi, reportID: query?.ri };
    logger.info('setting selected IDs : %s', selectedIDs);
    // we can't know the report id from the URL, so we have to parse it first (which is very gross but this is the API I was given)
    const reportId = dateResponse[selectedIDs?.year]?.months[selectedIDs?.month]?.reports[selectedIDs?.reportID]?.reportId || undefined;
    logger.info('setting reportID : %s', dateResponse[selectedIDs?.year]?.months[selectedIDs?.month]);
    let tableRows = {};
    const totalRow = [];
    let tableColumns = {};
    const reportType = {
        label: 'Hub Content',
        value: 'HubContent',
    };
    const { aggBy } = query;

    logger.info('Checking if query has been submitted by user.');
    if (aggBy !== undefined || reportId !== undefined) {
        // If we have the Aggregate type and the date range (which relates to the reportID), get the data
        logger.info(
            'Query Submitted\nCalling Metrics for Hub Content at : %s',
            GET_HUB_CONTENT.replace('[aggBy]', aggBy).replace('[reportId]', reportId)
        );

        try {
            const getHubMetricsResponse = await axios.get(GET_HUB_CONTENT.replace('[aggBy]', aggBy).replace('[reportId]', reportId), {
                withCredentials: true,
                headers: {
                    Cookie: req.headers.cookie,
                },
            });
            // make sure "size of data" field is rounded properly (10ths place).  more precise with epsilon
            // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
            for (let i = 0; i <= getHubMetricsResponse.data.aggDtos.length - 1; i++) {
                getHubMetricsResponse.data.aggDtos[i]['Size of Data(MB)'] =
                    Math.round((getHubMetricsResponse.data.aggDtos[i]['Size of Data(MB)'] + Number.EPSILON) * 10) / 10;
            }
            tableRows = generateMetricsRows(getHubMetricsResponse.data.aggDtos);
            const tempRow = tableRows.pop();
            tableColumns = getHubMetricsResponse.data.columnNames;
            tableColumns.map((columnName) => {
                if (columnName === 'Data Size') {
                    const size = tempRow[columnName];
                    const newSize = (size >= 1000
                        ? Math.round((size / 1000 + Number.EPSILON) * 100) / 100 + 'GB'
                        : Number.parseFloat((size + Number.EPSILON) * 100 / 100).toFixed(1) + 'MB');
                    tempRow[columnName] = newSize;
                } else if (columnName === 'Study Name') {
                    tempRow[columnName] = '-';
                }
                return totalRow.push(tempRow[columnName]);
            });
        } catch (e) {
            logger.error(`Get Hub Metrics call failed: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
    } else {
        logger.info('User has not submitted a query yet.');
    }
    // initialize years list
    const years = dateResponse.map((value, index) => {
        return { label: value.year, value: index };
    });
    // if a query is present, we need to populate the right months right away.
    const initializedMonths = dateResponse[selectedIDs?.yi || 0]?.months.map((value, index) => {
        return { label: value.month[0] + value.month.slice(1).toLowerCase(), value: index };
    });

    // if a query is present, we need to populate the reportID list for the month too.
    const initIDs = dateResponse[selectedIDs?.year]?.months[selectedIDs?.month].reports.map((value, index) => {
        return { label: value.reportDate.slice(8), value: index, reportID: value.reportId };
    });
    return {
        props: {
            tableRows,
            totalRow,
            tableColumns,
            reportType,
            aggregations,
            reportIDs: { years, dateResponse },
            initData: { months: initializedMonths, IDList: initIDs, selectedIDs, aggregate: query.aggBy }, // if query is present
            redirectString: '/metrics/HubContent',
            CSV_URL: GET_HUB_CONTENT_CSV.replace('[aggBy]', aggBy).replace('[reportId]', reportId),
            pageTitle: 'Metrics'
        },
    };
}

export default MetricsHub;
