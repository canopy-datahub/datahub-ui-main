import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { USER_LOGOUT } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'logout';

    try {
        await BaseMiddleware(req, res);
        let logoutResponse = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for logging out user`);
                logoutResponse = await axios.post(
                    `${USER_LOGOUT}`,
                    {},
                    {
                        withCredentials: true,
                        headers: { Cookie: req.headers.cookie },
                    }
                );

                if (logoutResponse?.data) {
                    logger.info(`logged out user`);
                }
                res.json(baseResponse('', logoutResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with logout`, e);
        res.status(e.response.status).json({ e });
    }
};
