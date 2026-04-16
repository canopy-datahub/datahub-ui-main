import React from 'react';
import DownloadsDashboard from '../../../views/DownloadsDashboard/DownloadsDashboard';

const CuratorDownloadsPage = (props) => <DownloadsDashboard {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            baseUrl: process.env.NEXT_PUBLIC_BACKEND_URL || '',
            pageTitle: 'Downloads Dashboard',
        },
    };
}

export default CuratorDownloadsPage;
