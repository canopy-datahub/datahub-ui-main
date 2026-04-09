import axios from 'axios';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../store/environment/environmentSlice';
import { BaseNotification, NotificationType, ErrorMessage } from '../../store/notifications/notificationConstants';
import { addNotification } from '../../store/notifications/notificationsSlice';
import { useRouter } from 'next/router';
import useKeycloak from './useKeycloak';
// prettier-ignore
/**
 * UseRest is a helper hook for in page react calls after the page is rendered.  If you need any calls post initializing the dom, this is what you use.
 * There are helper functions used for each Restful call type within, (restGet, restPut, restPost, and restDelete) will be what you use in your call like this
 * @example
 * const { restPut, restGet } = useRest();
 * @returns {}
 */
const useRest = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { keycloak, token } = useKeycloak();

    // options -> {showLoading, replacement error message, hide error message}
    const makeCall = async (type, path, body, options) => {
        let callResults = {};
        // Always read the token from the live Keycloak instance so that
        // auto-refreshed tokens are used even if the React state hasn't updated.
        const currentToken = keycloak?.token || token;
        // Base headers
        const baseHeaders = options?.headers
            ? { ...options.headers, 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff' }
            : {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Content-Type-Options': 'nosniff',
            };
        // Add Keycloak JWT token if available
        const headers = currentToken
            ? { ...baseHeaders, Authorization: `Bearer ${currentToken}` }
            : baseHeaders;
        // Params
        const params = {
            responseType: options?.responseType,
            noCache: true,
            headers: headers,
        };

        try {
            if (options?.showLoading) {
                dispatch(showLoading());
            }

            switch (type) {
                case 'GET':
                    callResults = await axios.get(path, params);
                    break;
                case 'POST':
                    callResults = await axios.post(path, body, params);
                    break;
                case 'PUT':
                    callResults = await axios.put(path, body, params);
                    break;
                case 'DELETE':
                    callResults = await axios.delete(path, {
                        ...params,
                        data: {
                            data: options?.data,
                        }
                    });
                    break;
            }

            if (options?.showLoading) {
                dispatch(hideLoading());
            }

            if (options?.showSuccess && (callResults.request.status === 200 || callResults.request.status === 201) && callResults?.data.success === true) {
                const tempNotification = { ...BaseNotification };
                tempNotification.message = callResults.data.message || options.successMessage || 'Success making the call';
                tempNotification.type = NotificationType.SUCCESS;
                tempNotification.delay = 8000;
                dispatch(addNotification(tempNotification));
            } else if (callResults.request.status === 200 && callResults?.data.success === false) {
                const tempNotification = { ...BaseNotification };
                tempNotification.message = callResults.data.message || options.errorMessage || 'Error making call.';
                tempNotification.type = NotificationType.ERROR;
                tempNotification.delay = 8000;
                dispatch(addNotification(tempNotification));
            }

            return callResults;
        } catch (e) {
            if (options?.showLoading) {
                if (window) {
                    window.scroll({
                        top: 0,
                        left: 0,
                    });
                }
                dispatch(hideLoading());
            }

            const errorMessage = e?.response?.data.message;
            const tempNotification = { ...BaseNotification };
            tempNotification.message = options.errorMessage || e?.response?.data.message || e?.message || 'Error making call.';
            tempNotification.autoHide = false;
            tempNotification.type = NotificationType.ERROR;
            tempNotification.delay = 8000;

            if ([401, 403].includes(e?.response?.status) || (e?.response?.status === 400 && errorMessage?.includes('cookie'))) {
                tempNotification.message = ErrorMessage[e?.response?.status];
                dispatch(addNotification(tempNotification));
                router.push('/');
            } else if (e?.response?.status === 500) {
                tempNotification.message = ErrorMessage[500];
                dispatch(addNotification(tempNotification));
            } else if (!options?.hideErrorMessage) {
                dispatch(addNotification(tempNotification));
            }
            return e;
        }
    };

    const restGet = (path, options) => {
        return makeCall('GET', path, null, options);
    };

    const restPut = async (path, body, options) => {
        return makeCall('PUT', path, body, options);
    };

    const restPost = (path, body, options) => {
        return makeCall('POST', path, body, options);
    };

    const restDelete = (path, options) => {
        return makeCall('DELETE', path, null, options);
    };

    return {
        restGet,
        restPut,
        restPost,
        restDelete,
    };
};

export default useRest;
