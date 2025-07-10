import React from 'react';
import News from '../../views/News/News';
import { GET_ALL_NEWS } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const NewsPage = (props) => <News {...props} />;

export async function getServerSideProps(context) {
    const { req } = context;

    logger.defaultMeta.service = 'all_news';

    let news;

    // GET News
    logger.info('Calling GET_ALL_NEWS: %s', GET_ALL_NEWS);
    try {
        const searchResponse = await axios.get(GET_ALL_NEWS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        news = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
    }


    return {
        props: {
            news,
            pageTitle: 'News',
        },
    };
}

export default NewsPage;
