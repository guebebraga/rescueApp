import { Router } from 'express';
import { getRescatista, getRescatistas, registerRescatista } from '../controlers/rescatistaController';
//import { registerUser } from '../controllers/userController';

const router = Router();


router.get('/rescatista', getRescatista);
router.post('/registerRescatista', registerRescatista);
router.get('/rescatistas', getRescatistas);

export default router;
