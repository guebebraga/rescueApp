import { Request, Response } from 'express';
import Animal, { IAnimal } from '../models/animalModel';
import Vet from '../models/veterinariaModel';
import upload from '../config/upload';
import User from '../models/userModel';


export const registerAnimal = [
  upload.single('foto'), // Middleware de Multer para manejar la subida del archivo

  async (req: Request, res: Response) => {
    const { nombre, edad, userDeReferencia, tamaño } = req.body;

    try { 
      const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary

      const newAnimal: IAnimal = new Animal({
        nombre,
        edad,
        tamaño,
        userDeReferencia,
        foto
      });

      await newAnimal.save();
      res.status(201).send('Animal registrado con éxito');
    } catch (error) {
      res.status(500).send('Error al registrar el usuario');
    }
  }
];

export const getAnimal = async (req: Request, res: Response) => {
  try {
    const _id = req.body._id;
    const animal = await Animal.findOne({ _id }).populate({
      path: 'userDeReferencia',
      populate: {
        path: 'vetDeReferencia'
      }
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener animal' });
  }
};



export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animals = await Animal.find({}).populate({
      path: 'userDeReferencia',
      populate: {
        path: 'vetDeReferencia',
        model: 'User' // Especificar el modelo de referencia
      }
    });
    res.status(200).json(animals);
  } catch (error) {
    console.error('Error al obtener los animales:', error);
    res.status(500).json({ message: 'Error al obtener los bichos' });
  }
};

export const getAnimalesPorTamaño = async (req: Request, res: Response) => {
  try {
    const { tamaño } = req.body;

    if (!['pequeño', 'mediano', 'grande'].includes(tamaño)) {
      return res.status(400).json({ message: 'Tamaño inválido' });
    }

    const animales = await Animal.aggregate([
      {
        $match: {
          tamaño: tamaño
        }
      },
      {
        $lookup: {
          from: 'users', // Nombre de la colección de usuarios
          localField: 'userDeReferencia',
          foreignField: '_id',
          as: 'userDeReferencia'
        }
      },
      {
        $unwind: {
          path: '$userDeReferencia',
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $lookup: {
          from: 'users', // Nombre de la colección de usuarios
          localField: 'userDeReferencia.vetDeReferencia',
          foreignField: '_id',
          as: 'vetDeReferencia'
        }
      },
      {
        $unwind: {
          path: '$vetDeReferencia',
          preserveNullAndEmptyArrays: true
        }
      }
    ]);

    res.status(200).json(animales);
  } catch (error) {
    console.error('Error al obtener animales por tamaño:', error);
    res.status(500).json({ message: 'Error al obtener animales' });
  }
};
