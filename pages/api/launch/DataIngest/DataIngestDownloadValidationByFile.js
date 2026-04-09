import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import axios from 'axios';

const VALIDATION_BY_FILE_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/api/submission-service/v1/download/validationErrorsByFile`;

export default async (req, res) => {
    logger.defaultMeta.service = 'download_validation_errors_by_file';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { fileId } = req.query;
        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        logger.info('Downloading validation errors for fileId: %s', fileId);
        const response = await axios.get(`${VALIDATION_BY_FILE_URL}?fileId=${fileId}`, {
            withCredentials: true,
            headers: _headers,
            responseType: 'arraybuffer',
        });

        const contentDisposition =
            response.headers['content-disposition'] ||
            `attachment; filename="validation-errors-file-${fileId}.csv"`;
        const contentType = response.headers['content-type'] || 'application/octet-stream';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', contentDisposition);
        res.status(200).send(Buffer.from(response.data));
    } catch (e) {
        logger.error('Failed to download validation errors by file', e?.response?.data || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to download validation errors' });
    }
};
