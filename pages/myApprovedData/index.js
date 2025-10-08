import React from 'react';
import logger from '../../lib/logger';
import { GET_APPROVED_DATA } from '../../constants/apiRoutes';
import axios from 'axios';
import ApprovedData from '../../views/ApprovedData/ApprovedData';
import Cookies from 'js-cookie';

const ApprovedDataPage = (props) => <ApprovedData {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'Approved Data';
    const { req } = context;
    let approvedData = [];
    let hasWorkbench, hasActiveAddonRequest, addonType;

    logger.info('Calling GET_APPROVED_DATA: %s', GET_APPROVED_DATA);
    try {
        const searchResponse = await axios.get(GET_APPROVED_DATA, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });

        approvedData = searchResponse.data.approvedFiles;
        hasWorkbench = searchResponse.data.hasWorkbench;
        hasActiveAddonRequest = searchResponse.data.hasActiveAddonRequest;
        addonType = searchResponse.data.addonType;
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
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
            addonType,
            approvedData,
            hasActiveAddonRequest,
            hasWorkbench,
            pageTitle: 'My Approved Data Access'
        },
    };
}

export default ApprovedDataPage;
