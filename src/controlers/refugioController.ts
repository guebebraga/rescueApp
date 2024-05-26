import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Refugio, { IRefugio } from '../models/refugioModel';
import Vet from '../models/veterinariaModel';
import upload from '../config/upload';

const saltRounds = 10;

export const registerRefugio = [
  upload.single('foto'), // Middleware de Multer para manejar la subida del archivo

  async (req: Request, res: Response) => {
    const { username, password, nombre, email, telefono, direccion, vetDeReferencia} = req.body;

    if (!username || !password) {
      return res.status(400).send('El nombre de usuario y la contraseña son requeridos');
    }

    try {
      const existingUser = await Refugio.findOne({ username });//tratar de que busque el user name en todas las colecciones
      if (existingUser) {
        return res.status(400).send('El usuario ya existe');
      }

      const existingVet = await Vet.findById(vetDeReferencia);
      if (!existingVet) {
        return res.status(400).send('La farmacia de referencia no existe');
      }

      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary

      const newRefugio: IRefugio = new Refugio({
        username,
        password: hashedPassword,
        nombre,
        email,
        telefono,
        direccion,
        vetDeReferencia,
        foto
      });

      await newRefugio.save();
      res.status(201).send('Usuario registrado con éxito');
    } catch (error) {
      res.status(500).send('Error al registrar el usuario');
    }
  }
];

export const getRefugio = async (req: Request, res: Response) => {
  try {
    const _id = req.body._id;
    const refugio = await Refugio.findOne({ _id }).select('-password -username -_id').populate({
      path: 'vetDeReferencia',
      select: '-password -username -_id' // Excluye los campos password, username y _id
    });
    res.status(200).json(refugio);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener rescatista' });
  }
};

export const getRefugios = async (req: Request, res: Response) => {
    try {
      const refugio = await Refugio.find({}).populate({
        path: 'vetDeReferencia',
        /*populate: {
          path: 'vetDeReferencia'
        }*/
      });
      res.status(200).json(refugio);
    } catch (error) {
      res.status(500).json({ message: 'Error al obtener los refugios' });
    }
  };

