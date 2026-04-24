import React from 'react';
import SubmitterDashboard from '../../views/SubmitterDashboard/Components/SubmitterDashboard';
import { GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';

const SubmitterDashboardPage = (props) => <SubmitterDashboard {...props} />;

export async function getServerSideProps(context) {
    const status = context.query?.status || 'in_progress';
    return {
        props: {
            status,
            baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
            fileUploadSOP: `${process.env.NEXT_PUBLIC_BACKEND_URL || ''}${GET_RESOURCE_CENTER_BUCKET}File_Upload_SOP.pdf`,
            pageTitle: 'Submitter Dashboard',
        },
    };
}

export default SubmitterDashboardPage;
