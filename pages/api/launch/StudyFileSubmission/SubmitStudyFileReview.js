import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_STUDY_FILE_SUBMISSION_REVIEW } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_study_file_submission_review';
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let submitReviewResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post_study_file_submission_review`);
                submitReviewResponse = await axios.post(POST_STUDY_FILE_SUBMISSION_REVIEW, body, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', submitReviewResponse?.data));
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
        res.status(e.response.status).json({ e });
    }
};
