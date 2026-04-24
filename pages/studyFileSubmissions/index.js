import React from 'react';
import StudyFileSubmissions from '../../views/StudyFileSubmissions/StudyFileSubmissions';

const StudyFileSubmissionsPage = (props) => <StudyFileSubmissions {...props} />;

export async function getServerSideProps(context) {
    const status = context.query?.status || 'in_progress';
    return {
        props: {
            status,
            baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
            pageTitle: 'Study File Submissions Dashboard',
        },
    };
}

export default StudyFileSubmissionsPage;
