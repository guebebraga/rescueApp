import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Rescatista, { IRescatista } from '../models/rescatistaModel';
//import upload from '../config/upload';

const saltRounds = 10;

export const registerUser = [
  /*upload.single('foto'), // Middleware de Multer para manejar la subida del archivo*/
  async (req: Request, res: Response) => {
    const { username, password, nombre, email, telefono, direccion, fechaNacimiento, farmaciaDeReferencia } = req.body;

    if (!username || !password) {
      return res.status(400).send('El nombre de usuario y la contraseña son requeridos');
    }

    try {
      const existingUser = await Rescatista.findOne({ username });
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      /*const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary*/

      const newRescatista: IRescatista = new Rescatista({
        username,
        password: hashedPassword,
        nombre,
        email,
        telefono,
        direccion,
        fechaNacimiento,
        farmaciaDeReferencia,
        /*foto*/
      });
      console.log(username,password,nombre,email,telefono,direccion,fechaNacimiento,farmaciaDeReferencia)
      await newRescatista.save();
      res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
      res.status(500).send('Error al registrar el usuario');
    }
  }
];

// Obtener todos los usuarios
export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await Rescatista.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los usuarios' });
  }
};
