import { Request, Response } from 'express';
import Animal, { IAnimal } from '../models/animalModel';
import Vet from '../models/veterinariaModel';
import upload from '../config/upload';


export const registerAnimal = [
  upload.single('foto'), // Middleware de Multer para manejar la subida del archivo

  async (req: Request, res: Response) => {
    const { nombre, edad, vetDeReferencia, rescatistaDeReferencia, } = req.body;

    try {
      /*const existingVet = await Vet.findById(vetDeReferencia);
      if (!existingVet) {
        return res.status(400).send('La farmacia de referencia no existe');
      }
      const existingResc = await Vet.findById(rescatistaDeReferencia);
      if (!existingResc) {
        return res.status(400).send('El rescatista de referencia no existe');
      }
      */
      
      const foto = req.file?.path; // Ruta de la imagen subida a Cloudinary

      const newAnimal: IAnimal = new Animal({
        nombre,
        edad,
        vetDeReferencia,
        rescatistaDeReferencia,
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
      path: 'vetDeReferencia, rescatistaDeReferencia '// esto púede estar mal 
    });
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener animal' });
  }
};


export const getAnimals = async (req: Request, res: Response) => {
  try {
    const animal = await Animal.find().populate('rescatistaDeReferencia');
    res.status(200).json(animal);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los bichos' });
  }
};
