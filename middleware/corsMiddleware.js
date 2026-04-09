import Cors from 'cors';
import initMiddleware from './initMiddleware';

const CorsMiddleware = initMiddleware(
    Cors({
        methods: ['GET', 'POST', 'PUT', 'DELETE']
    })
);

export default CorsMiddleware;
