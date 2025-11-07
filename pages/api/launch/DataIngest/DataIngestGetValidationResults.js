/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_VALIDATION_RESULTS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_validation_results_data_ingest';

    try {
        await BaseMiddleware(req, res);
        const { query } = req;
        const { submissionId } = query;
        let validationResultsResponse;
        switch (req.method) {
            case `GET`:
                logger.info('get request to get validation results of file validation in data ingest form');
                logger.info('body: %s', query);
                logger.info('endpoint: %s', GET_VALIDATION_RESULTS + submissionId);
                const headers = { Cookie: req.headers.cookie };
                // Forward Authorization header if present (for Keycloak JWT)
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                validationResultsResponse = await axios.get(GET_VALIDATION_RESULTS + submissionId, {
                    withCredentials: true,
                    headers: headers,
                });
                if (validationResultsResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', validationResultsResponse?.data));
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
        logger.error(`Something went wrong with getting results of validation`, e);
        res.status(e.response.status).json({ e });
    }
};
