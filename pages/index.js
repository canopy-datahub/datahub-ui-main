import React from 'react';
import Homepage from '../views/Homepage/Homepage';
import { GET_FUNDING, GET_NEWS, GET_EVENTS, GET_STATS, GET_CONTENT_UPDATES } from '../constants/apiRoutes';
import axios from 'axios';
import logger from '../lib/logger';

const App = (props) => <Homepage {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;

    logger.defaultMeta.service = 'Homepage';

    let funding, news, events, stats, contentUpdates = [];

    // GET Funding
    logger.info('Calling GET_FUNDING: %s', GET_FUNDING);
    try {
        const searchResponse = await axios.get(GET_FUNDING, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        funding = searchResponse?.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET News
    logger.info('Calling GET_NEWS: %s', GET_NEWS);
    try {
        const searchResponse = await axios.get(GET_NEWS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        news = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Events
    logger.info('Calling GET_EVENTS: %s', GET_EVENTS);
    try {
        const searchResponse = await axios.get(GET_EVENTS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        events = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Stats
    logger.info('Calling GET_STATS: %s', GET_STATS);
    try {
        const searchResponse = await axios.get(GET_STATS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        stats = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    // GET Content Updates
    logger.info('Calling GET_CONTENT_UPDATES: %s', GET_CONTENT_UPDATES);
    try {
        const searchResponse = await axios.get(GET_CONTENT_UPDATES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        contentUpdates = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }

    return {
        props: {
            funding,
            news,
            events,
            stats,
            contentUpdates,
            pageTitle: 'Homepage',
        },
    };
}

export default App;
