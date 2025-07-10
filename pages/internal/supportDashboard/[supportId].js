import InternalSupportRequestInfoPage from '../../../views/Internal/[SupportId]';
import logger from '../../../lib/logger';
import { GET_SUPPORT_REQUEST_BY_ID_INTERNAL, GET_ALL_SUPPORT_STATUSES } from '../../../constants/apiRoutes';
import axios from 'axios';
import { formatSnakeCase } from '../../../lib/componentHelpers/SupportFunctions/formatSnakeCase';
import Cookies from 'js-cookie';

const InternalSupportRequestPage = (props) => <InternalSupportRequestInfoPage {...props} />;

export async function getServerSideProps(context) {
    logger.defaultMeta.service = 'internal_user_get_support_request_by_id';
    const { params, req } = context;
    let requestInfoById = {};
    const supportStatuses = [];

    logger.info('Calling GET_SUPPORT_REQUEST_BY_ID_INTERNAL with: %s', GET_SUPPORT_REQUEST_BY_ID_INTERNAL);
    try {
        const getSupportRequestByIdResponse = await axios.get(`${GET_SUPPORT_REQUEST_BY_ID_INTERNAL}${params.supportId}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        requestInfoById = getSupportRequestByIdResponse.data;
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

    logger.info('Calling GET_ALL_SUPPORT_STATUSES with: %s', GET_ALL_SUPPORT_STATUSES);
    try {
        const getAllSupportStatuses = await axios.get(`${GET_ALL_SUPPORT_STATUSES}`, {
            withCredentials: true,
            headers: {
                Cookie: req.headers.cookie,
            },
        });
        getAllSupportStatuses.data.forEach((obj) => {
            const setup = {
                label: formatSnakeCase(obj),
                value: obj,
            };
            supportStatuses.push(setup);
        });
    } catch (e) {
        logger.error(`Error with GET_ALL_SUPPORT_STATUSES: ${e?.response?.data?.message || e?.response?.data?.detail || e}`);
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
            requestInfoById,
            supportStatuses,
            pageTitle: 'Support Request'
        },
    };
}

export default InternalSupportRequestPage;
