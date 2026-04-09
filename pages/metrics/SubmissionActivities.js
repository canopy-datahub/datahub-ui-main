import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Metrics from '../../views/Metrics/Metrics';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import { weekAgo, monthAgo } from '../../views/Metrics/Constants/MetricsConstants';

const REPORT_TYPE = { label: 'Submission Activities', value: 'SubmissionActivities' };
const AGGREGATIONS = [
    { label: 'Center', value: 'center' },
    { label: 'Study', value: 'study' },
];

const resolveDates = (time, startDateParam, endDateParam) => {
    const today = format(new Date(), 'yyyy-MM-dd');
    if (time === 'LastWeek') return { start: weekAgo, end: today };
    if (time === 'LastMonth') return { start: monthAgo, end: today };
    if (time === 'AllTime') return { start: '2019-12-01', end: today };
    return { start: startDateParam, end: endDateParam };
};

const MetricsHub = () => {
    const router = useRouter();
    const { token } = useKeycloak();
    const { restGet } = useRest();

    const [tableRows, setTableRows] = useState([]);
    const [tableColumns, setTableColumns] = useState([]);
    const [csvUrl, setCsvUrl] = useState('');
    const [initData, setInitData] = useState(null);

    const { aggBy = 'center', time, startDate: startDateParam, endDate: endDateParam } = router.query;

    useEffect(() => {
        if (!token) return;
        const { start, end } = resolveDates(time, startDateParam, endDateParam);
        if (!start || !end) return;

        setInitData({ time: time || 'Custom', from: start, to: end, aggregate: aggBy });

        restGet(
            `/api/launch/Metrics/SubmissionActivitiesData?aggBy=${aggBy}&startDate=${start}&endDate=${end}`,
            { errorMessage: 'Error loading submission activities metrics' }
        ).then((response) => {
            if (response?.status === 200) {
                const data = response.data.data;
                setTableRows(generateMetricsRows(data.dtos || []));
                setTableColumns(data.columnNames || []);
                setCsvUrl(`/api/report/v1/submissionMetricsCSV?aggBy=${aggBy}&startDate=${start}&endDate=${end}`);
            }
        });
    }, [token, aggBy, time, startDateParam, endDateParam]);

    return (
        <Metrics
            tableRows={tableRows}
            tableColumns={tableColumns}
            reportType={REPORT_TYPE}
            aggregations={AGGREGATIONS}
            initData={initData}
            redirectString="/metrics/SubmissionActivities"
            CSV_URL={csvUrl}
            pageTitle="Metrics"
            onGenerateReport={() => {}}
        />
    );
};

export async function getServerSideProps() {
    return { props: { pageTitle: 'Metrics' } };
}

export default MetricsHub;
