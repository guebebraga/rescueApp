import { Router } from 'express';
import { getUser, getUsers, registerUser } from '../controlers/userController';
import { logged } from '../middlewares/logged'; 

const router = Router();


router.get('/user', logged, getUser);
router.post('/register', registerUser);
router.get('/users', getUsers);



export default router;
