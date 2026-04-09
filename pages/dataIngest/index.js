import React from 'react';
import DataIngest from '../../views/DataIngest/DataIngest';
import { GET_RESOURCE_CENTER_BUCKET } from '../../constants/apiRoutes';

const DataIngestPage = (props) => <DataIngest {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            studiesData: [],
            categoriesData: {},
            fileUploadSOP: `${process.env.NEXT_PUBLIC_DEV_URL || ''}${GET_RESOURCE_CENTER_BUCKET}test.pdf`,
            pageTitle: 'Data Submission',
        },
    };
}

export default DataIngestPage;
