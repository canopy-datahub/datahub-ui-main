import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { DELETE_SUBMISSION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'delete_submission_submitter_dash';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let deleteSubmissionResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                logger.info(`Delete request for deleting a submission in the submitter dashboard`);
                logger.info('endpoint: %s', DELETE_SUBMISSION + body.data);
                deleteSubmissionResponse = await axios.delete(DELETE_SUBMISSION + body.data, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', deleteSubmissionResponse?.data));
                break;
        }
    } catch (e) {
        logger.error(`Submission Deletion in Submitter dashboard was not able to be performed due to an error.`, e);
        res.status(e.response.status).json({ e });
    }
};
