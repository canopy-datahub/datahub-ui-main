import React from 'react';
import DataIngest from '../../views/DataIngest/DataIngest';
import { GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';

const DataIngestSubmission = (props) => <DataIngest {...props} />;

export async function getServerSideProps(context) {
    const { params } = context;
    return {
        props: {
            submissionId: params.id,
            studiesData: [],
            categoriesData: {},
            submissionData: {},
            uploadedFilesData: {},
            bundlesData: {},
            reviewBundlesData: {},
            reviewStudyData: {},
            fileUploadSOP: `${process.env.NEXT_PUBLIC_DEV_URL || ''}${GET_RESOURCE_CENTER_BUCKET}test.pdf`,
            pageTitle: 'Data Submission',
        },
    };
}

export default DataIngestSubmission;
