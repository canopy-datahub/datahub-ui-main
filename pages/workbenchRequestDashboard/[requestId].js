import React from 'react';
import WorkbenchRequestDetailsPage from '../../views/WorkbenchRequest/WorkbenchRequestDetailsPage';
import logger from '../../lib/logger';
import axios from 'axios';
import { GET_WORKBENCH_REQUEST } from '../../constants/apiRoutes';
import Cookies from 'js-cookie';

const WorkbenchRequestDetailsInfo = (props) => <WorkbenchRequestDetailsPage {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'get_workbench_request';
    const { req } = context;
    const { requestId } = context.query;
    let workbenchRequestData;

    logger.info('Calling GET_WORKBENCH_REQUEST: %s', GET_WORKBENCH_REQUEST);
    try {
        const getWorkbenchRequestReponse = await axios.get(`${GET_WORKBENCH_REQUEST}${requestId}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        workbenchRequestData = getWorkbenchRequestReponse.data;
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
            requestId,
            workbenchRequestData,
            pageTitle: 'Workbench Request'
        },
    };
}

export default WorkbenchRequestDetailsInfo;
