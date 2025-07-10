import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_APPROVED_INSTITUTIONS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_approved_institutions';

    try {
        await BaseMiddleware(req, res);
        let response = [];
        switch (req.method) {
            case `GET`:
                logger.info('Calling GET_APPROVED_INSTITUTIONS with: %s', GET_APPROVED_INSTITUTIONS);
                response = await axios.get(`${GET_APPROVED_INSTITUTIONS}`, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (response?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', response.data));
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
        logger.error(`Something went wrong with get_approved_institutions`, e);
        res.status(e.response.status).json({ e });
    }
};
