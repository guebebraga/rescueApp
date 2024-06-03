// src/custom.d.ts
import { UserPayload } from './middlewares/logged';

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload;
        }
    }
}

