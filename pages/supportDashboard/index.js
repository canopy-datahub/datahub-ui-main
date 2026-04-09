import React from 'react';
import SupportDashboard from '../../views/SupportDashboard/SupportDashboard';

const SupportDashboardPage = (props) => <SupportDashboard {...props} />;

export async function getServerSideProps(context) {
    const status = context.query?.status || 'initiated';
    return {
        props: {
            status,
            pageTitle: 'Manage Support Requests',
        },
    };
}

export default SupportDashboardPage;
