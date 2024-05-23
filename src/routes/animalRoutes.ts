import { Router } from 'express';
import { getAnimal, getAnimals, registerAnimal} from '../controlers/animalController';
//import { registerUser } from '../controllers/userController';

const router = Router();


router.post('/registerAnimal', registerAnimal);

router.get('/animal', getAnimal);

router.get('/animals', getAnimals);

export default router;
