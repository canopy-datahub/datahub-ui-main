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
                putUserInfoResponse = await axios.put(`${UPDATE_USER_INFO_BY_ID}${id}`, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
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
        res.status(e.response.status).json({ e });
    }
};
