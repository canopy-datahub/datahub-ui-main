import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import axios from 'axios';

const STUDY_UUIDS_URL = `${process.env.NEXT_PUBLIC_DEV_URL}/api/download/v1/download/study-uuids`;

export default async (req, res) => {
    logger.defaultMeta.service = 'download_study_uuids';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') {
            return res.status(404).end();
        }

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        logger.info('Downloading study UUIDs spreadsheet');
        const response = await axios.get(STUDY_UUIDS_URL, {
            withCredentials: true,
            headers: _headers,
            responseType: 'arraybuffer',
        });

        const contentDisposition =
            response.headers['content-disposition'] ||
            'attachment; filename="RADx-Data-Hub_Study-IDs.xlsx"';
        const contentType =
            response.headers['content-type'] ||
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Disposition', contentDisposition);
        res.status(200).send(Buffer.from(response.data));
    } catch (e) {
        const status = e?.response?.status || 500;
        const backendData = e?.response?.data;
        let backendMessage;
        try {
            backendMessage = backendData
                ? Buffer.isBuffer(backendData)
                    ? backendData.toString('utf8')
                    : JSON.stringify(backendData)
                : e?.message;
        } catch (_) {
            backendMessage = e?.message;
        }
        logger.error(`Failed to download study UUIDs [${status}]: ${backendMessage}`);
        res.status(status).json({ message: 'Failed to download study UUIDs', detail: backendMessage });
    }
};
