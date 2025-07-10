import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import axios from 'axios';

export default async (req, res) => {
    try {
        await BaseMiddleware(req, res);
        const RAS_URL = process.env.RAS_URL;
        switch (req.method) {
            case `GET`:
                logger.info(`user went to login`);
                logger.info(RAS_URL);
                res.json(baseResponse('', RAS_URL));
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
        logger.error(`Something went wrong with post_support_request`, e);
        res.status(e.response.status).json({ e });
    }
};
