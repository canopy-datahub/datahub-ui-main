import React from 'react';
import Events from '../../views/Events/Events';
import { GET_ALL_EVENTS } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const EventsPage = (props) => <Events {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;

    logger.defaultMeta.service = 'all_events';

    let events;

    // GET News
    logger.info('Calling GET_ALL_EVENTS: %s', GET_ALL_EVENTS);
    try {
        const searchResponse = await axios.get(GET_ALL_EVENTS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        events = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }


    return {
        props: {
            events,
            pageTitle: 'Events',
        },
    };
}

export default EventsPage;
