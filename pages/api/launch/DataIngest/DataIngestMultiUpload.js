import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { POST_DI_MULTI_UPLOAD } from '../../../../constants/apiRoutes';
import axios from 'axios';

export const config = {
    api: {
        responseLimit: false,
        bodyParser: {
            sizeLimit: '250mb',
        },
    },
};

export default async (req, res) => {
    logger.defaultMeta.service = 'post_data_ingest_upload';

    try {
        await BaseMiddleware(req, res);
        const { body } = req;
        let uploadFileResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for uploading multiple file in data ingest form`);
                logger.info('endpoint: %s', POST_DI_MULTI_UPLOAD);
                // eslint-disable-next-line no-case-declarations
                const { files, fileNames } = body;
                // eslint-disable-next-line no-case-declarations
                const formData = new FormData();
                logger.info('files %s', files);
                // eslint-disable-next-line no-case-declarations
                for (let i = 0; i < files.length; i++) {
                    const newBlob = files[i];
                    const blob = new Blob([newBlob]);
                    formData.append('files', blob, fileNames[i]);
                }
                uploadFileResponse = await axios.post(POST_DI_MULTI_UPLOAD + body.submissionId, formData, {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                });
                logger.info('uploadFileResponse %s', uploadFileResponse?.data);
                res.json(baseResponse('', uploadFileResponse?.data));
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(`Something went wrong data ingest file upload`, e);
        res.status(e.response.status).json({ e });
    }
};
