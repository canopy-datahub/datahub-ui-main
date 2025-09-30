/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPLOAD_PORTAL_ZIP } from '../../../../constants/apiRoutes';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import axios from 'axios';

export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
    maxDuration: 120,
};

export default async (req, res) => {
    logger.defaultMeta.service = 'post_study_portal_upload';
    try {
        await BaseMiddleware(req, res);
        const form = formidable({ keepExtensions: true });
        let fields, files;
        const { body } = req;
        let uploadFileResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`post request for uploading zip file in study upload portal`);
                logger.info('endpoint: %s', UPLOAD_PORTAL_ZIP);
                // eslint-disable-next-line no-case-declarations
                [fields, files] = await form.parse(req);
                const studyId = fields.studyId;
                const formData = new FormData();
                const file = await fs.readFile(files.file[0].filepath);
                const blob = new Blob([file], { type: files.file[0].mimetype });
                formData.append('file', blob, files.file[0].originalFilename);
                const headers = {
                    Cookie: req.headers.cookie,
                    'Content-Type': req.headers['content-type']
                };
                // Forward Authorization header if present (for Keycloak JWT)
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                uploadFileResponse = await axios.post(`${UPLOAD_PORTAL_ZIP}/${studyId}`, formData, {
                    withCredentials: true,
                    headers: headers,
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
        logger.error(`Something went wrong study portal file upload`, e);
        res.status(e?.response?.status).json({ e });
    }
};
