import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { PUT_PUBLIC_TO_WORKBENCH } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'put_public_to_workbench';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { fileIds },
        } = req;

        let putPublicToWorkbenchResponse = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                putPublicToWorkbenchResponse = await axios.put(PUT_PUBLIC_TO_WORKBENCH.replace('[fileIDs]', fileIds), body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (putPublicToWorkbenchResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', putPublicToWorkbenchResponse.data));
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
