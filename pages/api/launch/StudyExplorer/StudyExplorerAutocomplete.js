/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_AUTOCOMPLETE } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_autocomplete_suggestions_study_explorer';

    try {
        await BaseMiddleware(req, res);
        const { query } = req;
        const { q } = query;
        let autocompleteSuggestions;
        switch (req.method) {
            case `GET`:
                logger.info('get request to get autocomplete suggestions for search');
                autocompleteSuggestions = await axios.get(GET_AUTOCOMPLETE + q, {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                });
                if (autocompleteSuggestions?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', autocompleteSuggestions?.data));
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
        logger.error(`Error attempting to get autocomplete suggestions`, e);
        res.status(e.response.status).json({ e });
    }
};
