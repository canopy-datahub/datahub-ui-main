import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_PREVIOUS_PAGE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_previous_page';
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let previousResponse = [];
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for going back to upload step in data ingest form`);
                previousResponse = await axios.post(POST_PREVIOUS_PAGE + body.submissionId, null, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', previousResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Could not go back to previous page`, e);
        res.status(e.response.status).json({ e });
    }
};
