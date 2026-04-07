import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Metrics from '../../views/Metrics/Metrics';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import { weekAgo, monthAgo } from '../../views/Metrics/Constants/MetricsConstants';

const REPORT_TYPE = { label: 'User Activities', value: 'UserActivities' };

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

    const { time, startDate: startDateParam, endDate: endDateParam } = router.query;

    useEffect(() => {
        if (!token) return;
        const { start, end } = resolveDates(time, startDateParam, endDateParam);
        if (!start || !end) return;

        setInitData({ time: time || 'Custom', from: start, to: end });

        restGet(
            `/api/launch/Metrics/UserActivitiesData?startDate=${start}&endDate=${end}`,
            { errorMessage: 'Error loading user activities metrics' }
        ).then((response) => {
            if (response?.status === 200) {
                const data = response.data.data;
                setTableRows(generateMetricsRows(data.metrics || []));
                setTableColumns(data.headers || []);
                setCsvUrl(`/api/report/v1/userActivitiesCSV?startDate=${start}&endDate=${end}`);
            }
        });
    }, [token, time, startDateParam, endDateParam]);

    return (
        <Metrics
            tableRows={tableRows}
            tableColumns={tableColumns}
            reportType={REPORT_TYPE}
            initData={initData}
            redirectString="/metrics/UserActivities"
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
