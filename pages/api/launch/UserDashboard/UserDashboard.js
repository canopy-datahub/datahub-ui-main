import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_USER_BY_ID } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_user_info_by_id';

    try {
        await BaseMiddleware(req, res);
        const {
            query: { id },
        } = req;
        let getUserInfoResponse = {};
        switch (req.method) {
            case `GET`:
                try {
                    getUserInfoResponse = await axios.get(`${GET_USER_BY_ID}${id}`, {
                        withCredentials: true,
                        headers: { Cookie: req.headers.cookie },
                    });
                    if (getUserInfoResponse?.data) {
                        logger.info(`data has been received`);
                    }
                    res.json(baseResponse('', getUserInfoResponse.data));
                } catch (error) {
                    res.status(error.response.status).json(error.response.data);
                }

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
        logger.error(`Something went wrong with get_user_info_by_id`, e);
        res.status(e.response.status).json({ e });
    }
};
