import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_SUBMIT_SUBMISSION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_final_submission';
    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let finalSubmissionResponse = [];
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for submitting a submission in data ingest form`);
                finalSubmissionResponse = await axios.post(POST_SUBMIT_SUBMISSION + body.submissionId, null, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', finalSubmissionResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`A Submission was not able to be created`, e);
        res.status(e.response.status).json({ e });
    }
};
