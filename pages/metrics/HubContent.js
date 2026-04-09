import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Metrics from '../../views/Metrics/Metrics';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';

const AGGREGATIONS = [
    { label: 'Center', value: 'center' },
    { label: 'Study', value: 'study' },
];

const REPORT_TYPE = { label: 'Hub Content', value: 'HubContent' };

const processMetricsResponse = (data) => {
    const aggDtos = data.aggDtos || [];
    for (let i = 0; i < aggDtos.length; i++) {
        aggDtos[i]['Size of Data(MB)'] =
            Math.round((aggDtos[i]['Size of Data(MB)'] + Number.EPSILON) * 10) / 10;
    }
    const rows = generateMetricsRows(aggDtos);
    const tempRow = rows.pop();
    const tableColumns = data.columnNames || [];
    const totalRow = [];
    tableColumns.forEach((columnName) => {
        if (columnName === 'Data Size') {
            const size = tempRow[columnName];
            tempRow[columnName] = size >= 1000
                ? Math.round((size / 1000 + Number.EPSILON) * 100) / 100 + 'GB'
                : Number.parseFloat((size + Number.EPSILON) * 100 / 100).toFixed(1) + 'MB';
        } else if (columnName === 'Study Name') {
            tempRow[columnName] = '-';
        }
        totalRow.push(tempRow[columnName]);
    });
    return { tableRows: rows, totalRow, tableColumns };
};

const MetricsHub = () => {
    const router = useRouter();
    const { token } = useKeycloak();
    const { restGet } = useRest();

    const [reportIDs, setReportIDs] = useState(null);
    const [tableRows, setTableRows] = useState([]);
    const [totalRow, setTotalRow] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [csvUrl, setCsvUrl] = useState('');
    const [initData, setInitData] = useState(null);

    // Step 1: fetch available report dates when token is ready
    useEffect(() => {
        if (!token) return;
        restGet('/api/launch/Metrics/ReportIds', {
            errorMessage: 'Error loading report dates',
        }).then((response) => {
            if (response?.status === 200) {
                const dateResponse = response.data.data;
                if (!dateResponse?.length) return;
                const years = dateResponse.map((v, i) => ({ label: v.year, value: i }));
                setReportIDs({ years, dateResponse });
            }
        });
    }, [token]);

    // Step 2: fetch metrics data once report IDs are loaded (using URL query params or defaults)
    useEffect(() => {
        if (!reportIDs) return;
        const { aggBy = 'center', yi, mi, ri } = router.query;
        const latestYi = yi !== undefined ? parseInt(yi) : reportIDs.dateResponse.length - 1;
        const latestMi = mi !== undefined ? parseInt(mi) : reportIDs.dateResponse[latestYi].months.length - 1;
        const latestRi = ri !== undefined ? parseInt(ri) : reportIDs.dateResponse[latestYi].months[latestMi].reports.length - 1;

        const months = reportIDs.dateResponse[latestYi]?.months.map((v, i) => ({
            label: v.month[0] + v.month.slice(1).toLowerCase(),
            value: i,
        }));
        const IDList = reportIDs.dateResponse[latestYi]?.months[latestMi]?.reports.map((v, i) => ({
            label: v.reportDate.slice(8),
            value: i,
            reportID: v.reportId,
        }));
        setInitData({ months, IDList, selectedIDs: { year: latestYi, month: latestMi, reportID: latestRi }, aggregate: aggBy });

        fetchReport({ aggBy, yi: latestYi, mi: latestMi, ri: latestRi });
    }, [reportIDs]);

    const fetchReport = ({ aggBy, yi, mi, ri }) => {
        if (!reportIDs) return;
        const reportId = reportIDs.dateResponse[yi]?.months[mi]?.reports[ri]?.reportId;
        if (!reportId) return;

        restGet(`/api/launch/Metrics/HubContentData?aggBy=${aggBy}&reportId=${reportId}`, {
            errorMessage: 'Error loading hub content metrics',
        }).then((response) => {
            if (response?.status === 200) {
                const { tableRows, totalRow, tableColumns } = processMetricsResponse(response.data.data);
                setTableRows(tableRows);
                setTotalRow(totalRow);
                setTableColumns(tableColumns);
                setCsvUrl(`/api/report/v1/download/hubContent?aggBy=${aggBy}&reportId=${reportId}`);
            }
        });
    };

    return (
        <Metrics
            tableRows={tableRows}
            totalRow={totalRow}
            tableColumns={tableColumns}
            reportType={REPORT_TYPE}
            aggregations={AGGREGATIONS}
            reportIDs={reportIDs}
            initData={initData}
            redirectString="/metrics/HubContent"
            CSV_URL={csvUrl}
            pageTitle="Metrics"
            onGenerateReport={fetchReport}
        />
    );
};

export async function getServerSideProps() {
    return { props: { pageTitle: 'Metrics' } };
}

export default MetricsHub;
