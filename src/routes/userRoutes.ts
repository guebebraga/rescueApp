// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUser, getUsers, registerUser } from '../controlers/rescatistaController';
//import { registerUser } from '../controllers/userController';

const router = Router();

router.get('/users', getUsers);
router.get('/user', getUser);
router.post('/register', registerUser);

export default router;
