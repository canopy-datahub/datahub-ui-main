import React from 'react';
import Newsletters from '../../views/Newsletters/Newsletters';
import { GET_NEWSLETTERS } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const NewslettersPage = (props) => <Newsletters {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;
    let newsletters = null;

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
        logger.info('GET_NEWSLETTERS response status: %s, data keys: %s',
            searchResponse.status,
            newsletters ? Object.keys(newsletters) : 'null'
        );
    } catch (e) {
        logger.error('GET_NEWSLETTERS failed: status=%s, message=%s',
            e?.response?.status,
            e?.response?.data?.message || e?.response?.data?.detail || e?.message || e
        );
    }

    // Convert integer keys to string keys if needed (Java API returns Map<Integer, List>)
    if (newsletters && typeof newsletters === 'object') {
        const converted = {};
        for (const key of Object.keys(newsletters)) {
            converted[String(key)] = newsletters[key];
        }
        newsletters = converted;
    }

    return {
        props: {
            newsletters,
            pageTitle: 'Newsletters'
        },
    };
}

export default NewslettersPage;
