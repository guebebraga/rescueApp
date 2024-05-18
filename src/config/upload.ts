import multer from 'multer';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import cloudinary from './cloudinaryConfig';

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'rescueApp',
        format: async (req: Request, file: any) => 'png', // Puedes cambiar el formato según tus necesidades
        public_id: (req:Request, file:any) => `${Date.now()}-${file.originalname}`,
    } as any, // Casting para evitar el error de tipado
});

const upload = multer({ storage: storage });

export default upload;

