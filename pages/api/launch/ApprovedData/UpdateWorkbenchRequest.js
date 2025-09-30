/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { PUT_WORKBENCH_REQUEST } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'Workbench Request Dashboard - ';

    try {
        await BaseMiddleware(req, res);

        let updateRequestResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                logger.info(`Attempting to Update Workbench Request for Request ID: ${req.body.requestId}`);
                const headers = { Cookie: req.headers.cookie };
                // Forward Authorization header if present (for Keycloak JWT)
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                updateRequestResponse = await axios.put(PUT_WORKBENCH_REQUEST, req.body, {
                    withCredentials: true,
                    headers: headers,
                });
                logger.info('Update Workbench Request Response %s', updateRequestResponse?.data);
                res.json(baseResponse('', updateRequestResponse?.data));
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status).json({ e });
    }
};
