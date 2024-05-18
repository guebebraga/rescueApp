import { Request, Response } from 'express';
import  bcrypt from 'bcrypt';
import Adoptante, { IAdoptante } from '../models/adoptanteModel';

const saltRounds = 10;

export const registerUser = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('Username and password are required');
  }

  try {
    const existingUser = await Adoptante.findOne({ username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newAdoptante: IAdoptante = new Adoptante({ username, password: hashedPassword });
    await newAdoptante.save();

    res.status(201).send('User registered successfully');
  } catch (error) {
    res.status(500).send('Error registering user');
  }
};

