import BaseMiddleware from '../../../../middleware/baseMiddleware';
import logger from '../../../../lib/logger';
import { baseResponse } from '../../../../lib/baseResponse';
import { PUT_TO_WORKBENCH } from '../../../../constants/apiRoutes';
import axios from 'axios';

export default async (req, res) => {
    logger.defaultMeta.service = 'put_files_to_workbench';

    try {
        await BaseMiddleware(req, res);
        const {
            body,
            query: { sasFiles, dataFiles, studyId },
        } = req;

        let putFilesToWorkbenchResponse = {};
        switch (req.method) {
            case `GET`:
                res.status(404).end();
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                const headers = { Cookie: req.headers.cookie };
                // Forward Authorization header if present (for Keycloak JWT)
                if (req.headers.authorization) {
                    headers.Authorization = req.headers.authorization;
                }
                putFilesToWorkbenchResponse = await axios.put(PUT_TO_WORKBENCH.replace('[sasFileIDs]', sasFiles).replace('[dataFileIDs]', dataFiles).replace('[studyId]', studyId), body, {
                    withCredentials: true,
                    headers: headers,
                });
                if (putFilesToWorkbenchResponse?.data) {
                    logger.info(`data has been received`);
                }
                res.json(baseResponse('', putFilesToWorkbenchResponse.data));
                break;
            case 'DELETE':
                res.status(404).end();
                break;
        }
    } catch (e) {
        logger.error(e?.response?.data?.message || e?.response?.data?.detail || e);
        res.status(e.response.status).json({ e });
    }
};
