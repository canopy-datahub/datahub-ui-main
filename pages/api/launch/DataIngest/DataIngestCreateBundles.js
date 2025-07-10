import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_CREATE_BUNDLES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_create_bundles';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let createBundlesResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for creating bundles in data ingest form`);
                logger.info('body: %s', body);
                //const { submissionId } = body;
                logger.info('endpoint: %s', POST_CREATE_BUNDLES + body.submissionId);
                createBundlesResponse = await axios.post(POST_CREATE_BUNDLES + body.submissionId, null, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', createBundlesResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong during data ingest bundle creation`, e);
        res.status(e.response.status).json({ e });
    }
};
