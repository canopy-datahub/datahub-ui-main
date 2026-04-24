import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import axios from 'axios';
import { SUBMISSION_SERVICE_URL } from '../../../../constants/apiRoutes';

const SUBMISSION_FILES_URL = `${SUBMISSION_SERVICE_URL}/curator/getFilesBySubm`;

export default async (req, res) => {
    logger.defaultMeta.service = 'study_file_submission_files';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { submissionId } = req.query;
        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        logger.info('Fetching study file submission files for submissionId: %s', submissionId);
        const response = await axios.get(`${SUBMISSION_FILES_URL}?submissionId=${submissionId}`, {
            withCredentials: true,
            headers: _headers,
        });

        res.status(200).json(response.data);
    } catch (e) {
        logger.error('Failed to fetch study file submission files', e?.response?.data || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to fetch submission files' });
    }
};
