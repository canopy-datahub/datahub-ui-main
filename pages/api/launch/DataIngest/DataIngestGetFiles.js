/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_BUNDLE_FILES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_validation_results_data_ingest';

    try {
        await BaseMiddleware(req, res);
        const { query } = req;
        const { fileId } = query;
        let bundleFilesResponse;
        switch (req.method) {
            case `GET`:
                logger.info('get request to get other files in the bundle in data ingest form validation');
                logger.info('body: %s', query);
                logger.info('endpoint: %s', GET_BUNDLE_FILES + fileId);
                bundleFilesResponse = await axios.get(GET_BUNDLE_FILES + fileId, {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                });
                if (bundleFilesResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', bundleFilesResponse?.data));
                res.status(200).end();
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
        logger.error(`Error attempting to get files in bundle`, e);
        res.status(e.response.status).json({ e });
    }
};
