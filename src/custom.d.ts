import { UserPayload } from './middlewares/logged'; // Ajusta la ruta según tu estructura de proyecto

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}
