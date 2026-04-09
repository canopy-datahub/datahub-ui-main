import React from 'react';
import ResourceCenter from '../../views/ResourceCenter/ResourceCenter';
import logger from '../../lib/logger';

const ResourceCenterPage = (props) => <ResourceCenter {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'resource_center';
    let { category } = context.query;

    if (!category) {
        category = 'all';
    } else {
        category = category[0];
    }


    return {
        props: {
            category,
            pageTitle: 'Resource Center',
        },
    };
}

export default ResourceCenterPage;
