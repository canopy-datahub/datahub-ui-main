import React from 'react';
import SiteMap from '../../views/SiteMap/SiteMap';

const SiteMapPage = (props) => <SiteMap {...props} />;

export async function getServerSideProps() {
    return {
        props: {
            pageTitle: 'Site Map',
        },
    };
}

export default SiteMapPage;
