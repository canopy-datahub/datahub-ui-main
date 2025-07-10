import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_VALIDATE_SUBMISSION } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_validate_submission';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let validationResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for validating files in data ingest form`);
                logger.info('body: %s', body);
                //const { submissionId } = body;
                logger.info('endpoint: %s', POST_VALIDATE_SUBMISSION + body.submissionId);
                validationResponse = await axios.post(POST_VALIDATE_SUBMISSION + body.submissionId, null, {
                    withCredentials: true,
                    headers: { Cookie: req.headers.cookie },
                });
                res.json(baseResponse('', validationResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong during data ingest validation of files`, e);
        res.status(e.response.status).json({ e });
    }
};
