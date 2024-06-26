import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User, { IUser } from '../models/userModel';
import upload from '../config/upload';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config()

const JWT_SECRET = process.env.TOKEN_SECRET || 'your_jwt_secret'; 

const saltRounds = 10;

export const registerUser = [
  upload.single('foto'), // Middleware de Multer para manejar la subida del archivo

  async (req: Request, res: Response) => {
    const { username, password, nombre, email, telefono, direccion, vetDeReferencia, rol} = req.body;

    if (!username || !password) {
      return res.status(400).send('El nombre de usuario y la contraseña son requeridos');
    }

    try {
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      if(vetDeReferencia){
      const existingVet = await User.findById(vetDeReferencia);
      if (!existingVet) {
        return res.status(400).send('La vet de referencia no existe');
      }
    }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary

      const newUser: IUser = new User({
        username,
        password: hashedPassword,
        nombre,
        email,
        telefono,
        direccion,
        vetDeReferencia,
        foto,
        rol
      });

      await newUser.save();
      res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
      res.status(500).send('Error al registrar el usuario');
    }
  }
];

export const getUser = async (req: Request, res: Response) => {
  try {
    const _id = req.body._id;
    const user = await User.findOne({ _id }).select('-password -username -_id').populate({
      path: 'vetDeReferencia',
      model: 'User',
      select: '-password -username -_id' // Excluye los campos password, username y _id
    });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener user' });
  }
};


export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({}).populate({
        path: 'vetDeReferencia',
        model: 'User', // Specify that the reference is to the User model
        select: '-password -username -_id' // Excluye los campos password, username y _id
      });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};



export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Check if password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo electrónico o contraseña incorrectos' });
        }

        // Create JWT payload
        const payload = {
            userId: user._id,
            nombre: user.nombre,
            username: user.username,
            email: user.email,
            rol: user.rol,
        };

        // Sign JWT
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};








