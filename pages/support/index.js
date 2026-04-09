import React from 'react';
import UserRequestSupport from '../../views/support/support';
import logger from '../../lib/logger';
import { GET_REQUEST_TYPES } from '../../constants/apiRoutes';
import axios from 'axios';

const UserRequestSupportPage = (props) => <UserRequestSupport {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_request_types';
    const { req } = context;
    let requestTypesData = {};

    logger.info('Calling GET_REQUEST_TYPES with: %s', GET_REQUEST_TYPES);
    try {
        const requestTypeResponse = await axios.get(GET_REQUEST_TYPES, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        requestTypesData = requestTypeResponse.data;
    } catch (e) {
        logger.error(`Error with get_request_types: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
    }

    return {
        props: {
            requestTypesData,
            pageTitle: 'Support Request',
        },
    };
}

export default UserRequestSupportPage;
