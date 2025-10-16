import React from 'react';
import logger from '../../../lib/logger';
import DownloadsDashboard from '../../../views/DownloadsDashboard/DownloadsDashboard';
import axios from 'axios';
import { GET_UPLOAD_PORTAL_DOWNLOADS } from '../../../constants/apiRoutes';
import Cookies from 'js-cookie';

const CuratorDownloadsPage = (props) => <DownloadsDashboard {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Downloads Dashboard - Curator View';
    const { req } = context;
    let downloads = [];

    logger.info(req.headers.cookie);

    logger.info('Calling GET_UPLOAD_PORTAL_DOWNLOADS with: %s', GET_UPLOAD_PORTAL_DOWNLOADS);
    try {
        const downloadsResponse = await axios.get(GET_UPLOAD_PORTAL_DOWNLOADS, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        downloads = downloadsResponse?.data;
    } catch (e) {
        logger.error(`GET_UPLOAD_PORTAL_DOWNLOADS call failed.  Error Message: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
        if ([404, 500].includes(e?.response?.status)) {
            return {
                redirect: {
                    destination: `/${e?.response?.status}`,
                },
            };
        } else if ([400, 401, 403].includes(e?.response?.status)) {
            if (e?.response?.status === 401) {
                Cookies.remove('chocolateChip');
            }
            return {
                redirect: {
                    destination: `/?e=${e?.response?.status}`,
                },
            };
        }
    }
    return {
        props: {
            downloads,
            pageTitle: 'Downloads Dashboard'
        },
    };
}

export default CuratorDownloadsPage;
