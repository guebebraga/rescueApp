import multer from 'multer';
import { CloudinaryStorage, Options } from 'multer-storage-cloudinary';
import { v2 as cloudinary } from 'cloudinary';
import { Request } from 'express';

interface CustomParams {
    folder: string;
    format: (req: Request, file: Express.Multer.File) => Promise<string> | string;
    public_id: (req: Request, file: Express.Multer.File) => string;
}

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rescueApp',
        format: async (req: Request, file: Express.Multer.File) => 'png', // Puedes cambiar el formato según tus necesidades
        public_id: (req: Request, file: Express.Multer.File) => `${Date.now()}-${file.originalname}`,
    } as CustomParams, // Casting para evitar el error de tipado
} as Options);

const upload = multer({ storage: storage });

export default upload;



