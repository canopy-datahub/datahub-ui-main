import React from 'react';
import { GET_INTERNAL_SUPPORT_REQUEST_REPORT } from '../../../constants/apiRoutes';
import InternalDashboard from '../../../views/Internal/InternalDashboard';

const InternalDashboardPage = (props) => <InternalDashboard {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            downloadCSV: `${process.env.NEXT_PUBLIC_DEV_URL}${GET_INTERNAL_SUPPORT_REQUEST_REPORT}`,
            pageTitle: 'Support Requests Dashboard',
        },
    };
}

export default InternalDashboardPage;
