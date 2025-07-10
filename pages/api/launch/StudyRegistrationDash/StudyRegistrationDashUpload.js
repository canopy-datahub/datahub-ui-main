/* eslint-disable no-case-declarations */
import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { UPLOAD_STUDY_REG_DASH } from '../../../../constants/apiRoutes';
import formidable from 'formidable';
import { promises as fs } from 'fs';
import axios from 'axios';

// File upload is a nasty beast.  This is the source of my strength.
// https://stackoverflow.com/a/76483035/23505780 God Bless Julian Ramos.  Amen.

/**
 * In order to properly upload a file with our setup, we need to use formidable, which will help us parse a multipart-form-data body
 * We need to keep the extensions of the files as well as an option (with keepExtensions: true), so that we can ensure the backend gets a "safe" file
 * In order for the file to read correctly, we have to use fs/promises.readFile and give it the file path from formidable
 * Then we take that file stream and put it into a blob with the mimetype of that file
 * then we add it to a formdata object and make our api call with that.
 * This is the only way to completely preserve the integrity of the file coming in.
 */
export const config = {
    api: {
        bodyParser: false,
        responseLimit: false,
    },
    // Specifies the maximum allowed duration for this function to execute (in seconds)
    maxDuration: 20,
};

export default async (req, res) => {
    logger.defaultMeta.service = 'Study Registration PDF Upload - CURATOR';

    try {
        await BaseMiddleware(req, res);
        const form = formidable({ keepExtensions: true });
        let fields, files;
        let uploadFileResponse;
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                logger.info(`Attempting to upload PDF File for Study Registration`);
                // eslint-disable-next-line no-unused-vars
                [fields, files] = await form.parse(req);
                const formData = new FormData();
                const file = await fs.readFile(files.file[0].filepath);
                const blob = new Blob([file], { type: files.file[0].mimetype });
                formData.append('file', blob, files.file[0].originalFilename);
                uploadFileResponse = await axios.post(UPLOAD_STUDY_REG_DASH, formData, {
                    withCredentials: true,
                    headers: {
                        Cookie: req.headers.cookie,
                        'Content-Type': req.headers['content-type'],
                    },
                });
                logger.info('PDF Upload Response %s', uploadFileResponse?.data);
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
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status).json({ e });
    }
};
