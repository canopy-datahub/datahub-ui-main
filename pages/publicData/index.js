import React from 'react';
import logger from '../../lib/logger';
import { GET_PUBLIC_DATA } from '../../constants/apiRoutes';
import axios from 'axios';
import PublicData from '../../views/PublicData/PublicData';

const PublicDataPage = (props) => <PublicData {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Public Data';
    const { req } = context;
    let publicData = [];
    let hasWorkbench;
    const baseUrl = process.env.DEV_URL;

    logger.info('Calling GET_PUBLIC_DATA: %s', GET_PUBLIC_DATA);
    try {
        const publicDataResponse = await axios.get(GET_PUBLIC_DATA, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        hasWorkbench = publicDataResponse.data.hasWorkbench;
        publicData = publicDataResponse.data.collections;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }

    return {
        props: {
            publicData,
            hasWorkbench,
            baseUrl,
            pageTitle: 'Public Data Access',
        },
    };
}

export default PublicDataPage;
