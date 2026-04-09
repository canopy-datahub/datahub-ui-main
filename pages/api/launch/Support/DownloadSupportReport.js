import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { DOWNLOAD_SUPPORT_REQUEST_REPORT } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'download_support_report';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') {
            return res.status(404).end();
        }

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        logger.info('Downloading support request report');
        const response = await axios.get(DOWNLOAD_SUPPORT_REQUEST_REPORT, {
            withCredentials: true,
            headers: _headers,
            responseType: 'arraybuffer',
        });

        res.setHeader('Content-Type', 'application/octet-stream');
        res.setHeader('Content-Disposition', 'attachment; filename="support_request.csv"');
        res.status(200).send(Buffer.from(response.data));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to download report' });
    }
};
