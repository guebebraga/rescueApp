import { Router } from 'express';
import { getRefugio, registerRefugio , getRefugios} from '../controlers/refugioController';


const router = Router();


router.post('/registerRefugio', registerRefugio);

router.get('/refugio', getRefugio);

router.get('/refugios', getRefugios);

export default router;
