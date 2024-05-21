import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Vet, { IVet } from '../models/veterinariaModel';
import upload from '../config/upload';

const saltRounds = 10;

export const registerVet = [
  upload.single('foto'), // Middleware de Multer para manejar la subida del archivo*/

  async (req: Request, res: Response) => {
    const { username, password, nombre, email, telefono, direccion/*, foto*/ } = req.body;

    if (!username || !password) {
      return res.status(400).send('El nombre de usuario y la contraseña son requeridos');
    }

    try {
      const existingUser = await Vet.findOne({ username });
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary*/

      const newVet: IVet= new Vet({
        username,
        password: hashedPassword,
        nombre,
        email,
        telefono,
        direccion,
        foto
      });
      console.log(username,password,nombre,email,telefono,direccion, foto)
      await newVet.save();
      res.status(201).send('Veterinaria registrada con éxito');
    } catch (error) {
      res.status(500).send('Error al registrar el Veterinaria');
    }
  }
];

// Obtener todos los usuarios
export const getVets = async (req: Request, res: Response) => {
  try {
    const vets = await Vet.find();
    res.status(200).json(vets);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los veterinarias' });
  }
};
