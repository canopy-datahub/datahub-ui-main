import { baseResponse, errorResponse } from '../../lib/baseResponse';
import BaseMiddleware from '../../middleware/baseMiddleware';

export default async (req, res) => {
    try {
        await BaseMiddleware(req, res);
        switch (req.method) {
            case 'GET':
                res.json(baseResponse('Healthy', {}));
                break;
            case 'POST':
                res.status(404).end();
                break;
            case 'PUT':
                res.status(404).end();
                break;
            case 'DELETE':
                res.status(404).end();
                break;
            default:
                res.status(404).end();
        }
    } catch (e) {
        res.json(errorResponse(e));
    }
};
