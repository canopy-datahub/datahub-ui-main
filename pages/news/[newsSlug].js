import React from 'react';
import NewsArticle from '../../views/News/NewsArticle';
import { GET_NEWS_ARTICLE } from '../../constants/apiRoutes';
import axios from 'axios';
import logger from '../../lib/logger';

const NewsArticlePage = (props) => <NewsArticle {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'news_article';
    const { req } = context;
    const { newsSlug } = context.query;
    let newsArticleData = {};

    // GET News Article
    logger.info('Calling GET_NEWS_ARTICLE with : %s', GET_NEWS_ARTICLE + newsSlug);
    try {
        const searchResponse = await axios.get(GET_NEWS_ARTICLE + newsSlug, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        newsArticleData = searchResponse.data;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/news`,
                },
            };
        }
    }

    return {
        props: {
            newsArticleData,
            pageTitle: 'News',
        },
    };
}

export default NewsArticlePage;
