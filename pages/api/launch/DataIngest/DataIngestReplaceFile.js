/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { PUT_REPLACE_FILE } from '../../../../constants/apiRoutes';
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
            case 'PUT':
                logger.info(`post request for uploading a file in data ingest form`);
                logger.info('endpoint: %s', PUT_REPLACE_FILE);
                const { newFile } = body;
                const formData = new FormData();
                const blob = new Blob([newFile]);
                formData.append('newFile', blob, body.fileName);
                uploadFileResponse = await axios.put(PUT_REPLACE_FILE + body.fileId, formData, {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                    },
                });
                logger.info('uploadFileResponse %s', uploadFileResponse?.data);
                res.json(baseResponse('', uploadFileResponse?.data));
                break;
            case 'POST':
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
