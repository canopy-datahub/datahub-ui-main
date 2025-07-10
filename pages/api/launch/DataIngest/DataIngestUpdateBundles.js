import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_BUNDLES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_update_bundles';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let updateBundlesResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for updating bundles in data ingest form`);
                logger.info('body: %s', body);
                logger.info('endpoint: %s', POST_BUNDLES);
                updateBundlesResponse = await axios.post(POST_BUNDLES, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', updateBundlesResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong during data ingest update bundles step`, e);
        res.status(e.response.status).json({ e });
    }
};
