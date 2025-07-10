import CorsMiddleware from './corsMiddleware';

const BaseMiddleware = async (req, res) => {
    try {
        await CorsMiddleware(req, res);
    } catch (e) {
        return e;
    }
};

export default BaseMiddleware;
