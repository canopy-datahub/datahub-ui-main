import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { GET_SUBMISSION_INFO, GET_UPLOADED_FILES, GET_CATEGORIES, GET_BUNDLES } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'data_ingest_submission_data';

    try {
        await BaseMiddleware(req, res);
        if (req.method !== 'GET') return res.status(404).end();

        const { submissionId } = req.query;
        if (!submissionId) return res.status(400).json({ message: 'submissionId is required' });

        const _headers = { Cookie: req.headers.cookie };
        if (req.headers.authorization) {
            _headers.Authorization = req.headers.authorization;
        }

        // Always fetch submission info and uploaded files
        const [infoRes, filesRes] = await Promise.allSettled([
            axios.get(`${GET_SUBMISSION_INFO}${submissionId}`, { withCredentials: true, headers: _headers }),
            axios.get(`${GET_UPLOADED_FILES}${submissionId}`, { withCredentials: true, headers: _headers }),
        ]);

        if (infoRes.status === 'rejected') {
            const status = infoRes.reason?.response?.status || 500;
            return res.status(status).json({ message: 'Failed to load submission info' });
        }

        const submissionData = infoRes.value.data;
        const uploadedFilesData = filesRes.status === 'fulfilled' ? filesRes.value.data : {};
        const step = submissionData?.id;

        let categoriesData = {};
        let bundlesData = {};
        let reviewBundlesData = {};
        let reviewStudyData = {};

        // Step 2 (Categorize): needs categories + bundles
        // Step 3 (Validate): needs categories
        if (step === 2 || step === 3) {
            const [catRes, bundleRes] = await Promise.allSettled([
                axios.get(GET_CATEGORIES, { withCredentials: true, headers: _headers }),
                step === 2
                    ? axios.get(`${GET_BUNDLES}${submissionId}`, { withCredentials: true, headers: _headers })
                    : Promise.resolve({ data: {} }),
            ]);
            if (catRes.status === 'fulfilled') categoriesData = catRes.value.data;
            if (bundleRes.status === 'fulfilled') bundlesData = bundleRes.value.data;
        }

        // Step 4 (Review & Submit): needs review bundles + review study data
        if (step === 4) {
            const [reviewBundlesRes, reviewStudyRes] = await Promise.allSettled([
                axios.get(`${GET_BUNDLES}${submissionId}`, { withCredentials: true, headers: _headers }),
                axios.get(`${GET_UPLOADED_FILES}${submissionId}`, { withCredentials: true, headers: _headers }),
            ]);
            if (reviewBundlesRes.status === 'fulfilled') reviewBundlesData = reviewBundlesRes.value.data;
            if (reviewStudyRes.status === 'fulfilled') reviewStudyData = reviewStudyRes.value.data;
        }

        res.status(200).json(baseResponse('', {
            submissionData,
            uploadedFilesData,
            categoriesData,
            bundlesData,
            reviewBundlesData,
            reviewStudyData,
            // step 5 means completed — signal the client to redirect
            isCompleted: step === 5,
        }));
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e?.response?.status || 500).json({ message: 'Failed to load submission data' });
    }
};
