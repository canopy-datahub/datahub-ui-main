import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_VARIABLES_BY_STUDY } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_study_variables';
    const {
        query: { studyId },
    } = req;

    try {
        await BaseMiddleware(req, res);
        let studyResponse = [];
        switch (req.method) {
            case `GET`:
                logger.info('Calling GET_VARIABLES_BY_STUDY with: %s', `${GET_VARIABLES_BY_STUDY}${studyId}`);
                studyResponse = await axios.get(`${GET_VARIABLES_BY_STUDY}${studyId}`, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                if (studyResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', studyResponse.data));
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
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status).json({ e });
    }
};
