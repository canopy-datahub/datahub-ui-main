import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_USER_REGISTRATION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_user_registration';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { sessionId },
        } = req;
        let userRegistrationResponse = [];
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for submitting user registrations`);
                const headers = { Cookie: req.headers.cookie };
                // Forward Authorization header if present (for Keycloak JWT)
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                userRegistrationResponse = await axios.post(POST_USER_REGISTRATION.replace('[sessionId]', sessionId), body, {
                    withCredentials: true,
                    headers: headers,
                });
                if (userRegistrationResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', userRegistrationResponse.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with post_user_registration'`, e);
        res.status(e.response.status).json({ e });
    }
};
