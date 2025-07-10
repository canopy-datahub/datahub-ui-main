import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPDATE_DETAILED_SUPPORT_TICKET } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'update_support_ticket';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { id },
        } = req;

        let supportTicketResponse = [];
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                logger.info(`put request for updating a support ticket`);
                supportTicketResponse = await axios.put(`${UPDATE_DETAILED_SUPPORT_TICKET}${id}`, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (supportTicketResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', supportTicketResponse?.data));
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong with update_support_ticket`, e);
        res.status(e.response.status).json({ e });
    }
};
