import { Router } from 'express';
import { getUser, getUsers, registerUser, login } from '../controlers/userController';
import { logged } from '../middlewares/logged'; 

const router = Router();


router.get('/user', logged, getUser);
router.post('/register', registerUser);
router.get('/users', getUsers);
router.post('/login',login)


export default router;
