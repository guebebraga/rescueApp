// src/middlewares/logged.ts
import dotenv from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();

interface UserPayload extends JwtPayload {
    userId: string;
    nombre: string;
    username: string;
    email: string;
    rol: string;
}

export const dataFromToken = async (token: string): Promise<UserPayload | null> => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.TOKEN_SECRET!, (err, data) => {
            if (err) return reject(err);
            resolve(data as UserPayload);
        });
    });
};

export const logged = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const bearerToken = req.header("Authorization");
        if (!bearerToken) {
            return res.status(401).json({ mensaje: "Fallo la autorización" });
        }

        const token = bearerToken.split(' ')[1];
        const user = await dataFromToken(token);

        if (!user || !user.userId) {
            return res.status(401).json({ mensaje: "Credenciales inválidas" });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(500).json({ mensaje: "Error inesperado" });
    }
};
