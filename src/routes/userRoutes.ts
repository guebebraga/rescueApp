// src/routes/userRoutes.ts
import { Router } from 'express';
import { getUsers, registerUser } from '../controlers/userController';
//import { registerUser } from '../controllers/userController';

const router = Router();

// Ruta para obtener todos los usuarios
router.get('/', getUsers);

// Ruta para crear un usuario (esto sería redundante con el registro, así que se puede omitir si no es necesario)
// router.post('/', createUser);

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

export default router;
