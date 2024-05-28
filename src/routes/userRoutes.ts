import { Router } from 'express';
import { getUser, getUsers, registerUser } from '../controlers/userController';


const router = Router();


router.get('/user', getUser);
router.post('/register', registerUser);
router.get('/users', getUsers);

export default router;
