import React from 'react';
import UserDashboard from '../../views/UserDashboard/UserDashboard';

const UserDashboardPage = (props) => <UserDashboard {...props} />;

export async function getServerSideProps(context) {
    const status = context.query?.status || 'active';
    return {
        props: {
            status,
            pageTitle: 'Manage Users',
        },
    };
}

export default UserDashboardPage;
