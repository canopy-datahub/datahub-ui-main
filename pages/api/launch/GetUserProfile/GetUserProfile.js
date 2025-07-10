import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_INFO_BY_COOKIE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_user_info_by_cookie';

    try {
        await BaseMiddleware(req, res);
        let userRegistrationResponse = [];
        switch (req.method) {
            case `GET`:
                logger.info('Calling GET_INFO_BY_COOKIE with: %s', GET_INFO_BY_COOKIE);
                userRegistrationResponse = await axios.get(`${GET_INFO_BY_COOKIE}`, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (userRegistrationResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', userRegistrationResponse.data));
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with get_user_info_by_cookie`, e);
        res.status(e.response.status).json({ e });
    }
};
