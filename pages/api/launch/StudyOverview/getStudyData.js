import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_STUDY, GET_STUDY_DOCUMENTS, GET_STUDY_DATASETS } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'get_study_data';
    const { studyId } = req.query;

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') {
            return res.status(404).end();
        }

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        const [studyRes, docsRes, datasetsRes] = await Promise.allSettled([
            axios.get(`${GET_STUDY}${studyId}`, { withCredentials: true, headers: _headers }),
            axios.get(`${GET_STUDY_DOCUMENTS}${studyId}`, { withCredentials: true, headers: _headers }),
            axios.get(`${GET_STUDY_DATASETS}${studyId}`, { withCredentials: true, headers: _headers }),
        ]);

        const studyData = studyRes.status === 'fulfilled' ? studyRes.value.data : null;
        const studyDocuments = docsRes.status === 'fulfilled' ? docsRes.value.data : [];
        const studyDatasets = datasetsRes.status === 'fulfilled'
            ? datasetsRes.value.data
            : { dataFileDTOS: [], userHasStudyAccess: false };

        if (!studyData) {
            const err = studyRes.reason;
            const status = err?.response?.status;
            if (status === 404) return res.status(404).json({ message: 'Study not found' });
            if (status === 401 || status === 403) return res.status(status).json({ message: 'Unauthorized' });
            return res.status(500).json({ message: 'Failed to load study' });
        }

        res.status(200).json(baseResponse('', { studyData, studyDocuments, studyDatasets }));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ e });
    }
};
