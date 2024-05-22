import { Router } from 'express';
import { getVets, registerVet } from '../controlers/veterinariaController';

const router = Router();

router.get('/', getVets);
router.post('/registerVet', registerVet);

export default router;