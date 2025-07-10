import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_ADDON_FORM } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'Add On Request Form';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;

        let postAddOnRequestResult = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info('Attempting to post add on form');
                postAddOnRequestResult = await axios.post(POST_ADDON_FORM, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (postAddOnRequestResult?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', postAddOnRequestResult.data));
                break;
            case 'PUT':
                res.status(404).end();
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
