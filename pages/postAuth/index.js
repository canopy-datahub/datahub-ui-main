import React from 'react';
import logger from '../../lib/logger';
import { GET_INFO_BY_SESSION } from '../../constants/apiRoutes';
import axios from 'axios';
import PostAuth from '../../views/PostAuth/PostAuth';

const PostAuthPage = (props) => <PostAuth {...props} />;

/**
 * Post Auth server side page
 * When the user hits /postAuth?sessionID={...}, the session id is taken from the url and used in
 * GET_INFO_BY_SESSION's url to get user info from the backend.
 */
// TODO: setting up proper redirect to users last place(page) in application

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'post_auth';
    const { query, req } = context;
    let userProfile = {};

    logger.info('Calling GET_INFO_BY_SESSION with: %s', GET_INFO_BY_SESSION);
    try {
        const getInfoBySessionResponse = await axios.get(`${GET_INFO_BY_SESSION}${query.sessionID}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        userProfile = getInfoBySessionResponse.data;
    } catch (e) {
        logger.error(`Error with GET_INFO_BY_SESSION: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    return {
        props: {
            userProfile,
        },
    };
}

export default PostAuthPage;
