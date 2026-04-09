import React from 'react';
import StudyOverview from '../../views/StudyOverview/StudyOverview';
import { BASE_URL } from '../../constants/apiRoutes';

const StudyOverviewPage = (props) => <StudyOverview {...props} />;

export async function getServerSideProps(context) {
    const { studyId } = context.query;

    return {
        props: {
            studyId,
            baseUrl: BASE_URL,
            pageTitle: 'Study Overview',
        },
    };
}

export default StudyOverviewPage;
