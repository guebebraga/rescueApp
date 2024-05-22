import { Router } from 'express';
import { getAnimal, getAnimals, registerAnimal} from '../controlers/animalController';
//import { registerUser } from '../controllers/userController';

const router = Router();


router.get('/animal', getAnimal);
router.post('/registerAnimal', registerAnimal);
router.get('/users', getAnimals);

export default router;
