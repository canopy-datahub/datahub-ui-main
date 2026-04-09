import React from 'react';
import StudyFileSubmissionDetailsPage from '../../views/StudyFileSubmissions/StudyFileSubmissionDetailsPage';

const StudyFileSubmissionsInfo = (props) => <StudyFileSubmissionDetailsPage {...props} />;

export async function getServerSideProps(context) {
    const { submissionId } = context.query;
    return {
        props: {
            submissionId,
            pageTitle: 'Study File Submission',
        },
    };
}

export default StudyFileSubmissionsInfo;
