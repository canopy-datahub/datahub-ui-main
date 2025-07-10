import React from 'react';
import Newsletters from '../../views/Newsletters/Newsletters';
import { GET_NEWSLETTERS } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const NewslettersPage = (props) => <Newsletters {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;
    let newsletters;

    logger.defaultMeta.service = 'newsletters';

    // GET Newsletters
    logger.info('Calling GET_NEWSLETTERS: %s', GET_NEWSLETTERS);
    try {
        const searchResponse = await axios.get(GET_NEWSLETTERS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        newsletters = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }


    return {
        props: {
            newsletters,
            pageTitle: 'Newsletters'
        },
    };
}

export default NewslettersPage;
