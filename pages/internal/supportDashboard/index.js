import React from 'react';
import InternalDashboard from '../../../views/Internal/InternalDashboard';

const InternalDashboardPage = (props) => <InternalDashboard {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'Support Requests Dashboard',
        },
    };
}

export default InternalDashboardPage;
