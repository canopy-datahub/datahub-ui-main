import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPDATE_USER_INFO_BY_ID } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'update_user_info_by_id';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { id },
        } = req;
        let putUserInfoResponse = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                const putHeaders = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    putHeaders.Authorization = req.headers.authorization;
                }
                putUserInfoResponse = await axios.put(`${UPDATE_USER_INFO_BY_ID}${id}`, body, {
                    withCredentials: true,
                    headers: putHeaders,
                });
                if (putUserInfoResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', putUserInfoResponse.data));
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        // Forward the backend's response body so the client can read its message.
        // AxiosError.toJSON() omits `response.data`, so JSON.stringify(e) silently
        // drops the backend's actual error — passing `e.response.data` preserves it.
        const status = e?.response?.status || 500;
        const body = e?.response?.data || { message: e?.message || 'Internal error' };
        res.status(status).json(body);
    }
};
