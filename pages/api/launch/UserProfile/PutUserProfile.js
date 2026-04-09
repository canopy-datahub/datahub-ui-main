import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPDATE_USER_PROFILE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'update_user_profile';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { id },
        } = req;
        let putUserProfileResponse = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT': {
                const headers = { Cookie: req.headers.cookie };
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                putUserProfileResponse = await axios.put(`${UPDATE_USER_PROFILE}`, body, {
                    withCredentials: true,
                    headers,
                });
                if (putUserProfileResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', putUserProfileResponse.data));
                break;
            }
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e.response.status).json({ e });
    }
};
