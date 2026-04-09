import React from 'react';
import StudyRegistrationDash from '../../../views/StudyRegistration/StudyRegistrationDash/StudyRegistrationDash';

const StudyRegistrationCuratorPage = (props) => <StudyRegistrationDash {...props} />;

export async function getServerSideProps(context) {
    const status = context.query?.status || 'In Review';
    return {
        props: {
            userRole: 'curator',
            status,
            pageTitle: 'Study Registration Dashboard',
        },
    };
}

export default StudyRegistrationCuratorPage;
