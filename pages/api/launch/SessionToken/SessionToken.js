import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPDATE_SESSION_TOKEN } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'refresh_session_token';

    try {
        await BaseMiddleware(req, res);
        let sessionToken = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info('post request refeshing session token');
                sessionToken = await axios.post(
                    `${UPDATE_SESSION_TOKEN}`,
                    {},
                    {
                        withCredentials: true,
                        headers: { Cookie: req.headers.cookie },
                    }
                );
                if (sessionToken?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', sessionToken?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with refeshing session token: ${e?.response?.data?.message || e?.response?.data?.detail || e} `);
        res.status(e.response.status).json({ e });
    }
};
