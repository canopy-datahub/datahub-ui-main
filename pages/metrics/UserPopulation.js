import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { format } from 'date-fns';
import Metrics from '../../views/Metrics/Metrics';
import useRest from '../../lib/hooks/useRest';
import useKeycloak from '../../lib/hooks/useKeycloak';
import { generateMetricsRows } from '../../lib/componentHelpers/TableHelpers/metricsTableHelpers';
import { weekAgo, monthAgo } from '../../views/Metrics/Constants/MetricsConstants';

const REPORT_TYPE = { label: 'User Population', value: 'UserPopulation' };
const AGGREGATIONS = [
    { label: 'Institution: Type', value: 'type' },
    { label: 'Institution: Location', value: 'location' },
    { label: 'Institution: Profit/Not for Profit', value: 'profit' },
    { label: 'User: Researcher Level', value: 'level' },
    { label: 'User: Email Address', value: 'email' },
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

    const { aggBy = 'type', time, startDate: startDateParam, endDate: endDateParam } = router.query;

    useEffect(() => {
        if (!token) return;
        const { start, end } = resolveDates(time, startDateParam, endDateParam);
        if (!start || !end) return;

        setInitData({ time: time || 'Custom', from: start, to: end, aggregate: aggBy });

        restGet(
            `/api/launch/Metrics/UserPopulationData?aggBy=${aggBy}&startDate=${start}&endDate=${end}`,
            { errorMessage: 'Error loading user population metrics' }
        ).then((response) => {
            if (response?.status === 200) {
                const data = response.data.data;
                setTableRows(generateMetricsRows(data.aggDtos || []));
                setTableColumns(data.columnNames || []);
                setCsvUrl(`/api/report/v1/userMetricsCSV?aggBy=${aggBy}&startDate=${start}&endDate=${end}`);
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
            redirectString="/metrics/UserPopulation"
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
