import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import axios from 'axios';
import { SUBMISSION_SERVICE_URL } from '../../../../constants/apiRoutes';

const DOWNLOAD_URL = `${SUBMISSION_SERVICE_URL}/curator/all-submission-files`;

export default async (req, res) => {
    logger.defaultMeta.service = 'download_study_files';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { submissionId } = req.query;
        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        logger.info('Downloading all study files for submissionId: %s', submissionId);
        const response = await axios.get(`${DOWNLOAD_URL}?submissionId=${submissionId}`, {
            withCredentials: true,
            headers: _headers,
            responseType: 'arraybuffer',
        });

        const contentDisposition =
            response.headers['content-disposition'] ||
            `attachment; filename="submission-${submissionId}-files.zip"`;
        const contentType = response.headers['content-type'] || 'application/zip';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', contentDisposition);
        res.status(200).send(Buffer.from(response.data));
    } catch (e) {
        logger.error('Failed to download study files', e?.response?.data || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to download study files' });
    }
};
