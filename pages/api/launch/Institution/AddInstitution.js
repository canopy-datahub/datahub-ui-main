import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_INSTITUTION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_institution';

    let addInstitutionResponse = null;
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                try {
                    addInstitutionResponse = await axios.post(POST_INSTITUTION, body, {
                        withCredentials: true,
                        headers: { Cookie: req.headers.cookie },
                    });
                    if (addInstitutionResponse?.data) {
                        logger.info(`data has been received`);
                    }
                    res.json(baseResponse('', addInstitutionResponse?.data));
                } catch (error) {
                    res.status(error.response.status).json(error.response.data);
                }

                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.info(`Something went wrong with post_institution`, e);
        res.status(e.response.status).json({ e });
    }
};
