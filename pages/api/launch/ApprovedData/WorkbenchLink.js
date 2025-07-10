import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_WORKBENCH } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'workbench_link';
    try {
        await BaseMiddleware(req, res);

        let workbenchLink;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info('Calling GET_WORKBENCH with: %s', GET_WORKBENCH);
                workbenchLink = await axios.post(GET_WORKBENCH, [], {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (workbenchLink?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', workbenchLink.data));
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
