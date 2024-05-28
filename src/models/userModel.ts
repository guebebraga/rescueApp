
import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    nombre: string;
    username: string;
    password: string;
    email: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: string; // Changed to Date type for better consistency
    vetDeReferencia?: mongoose.Schema.Types.ObjectId;
    foto?: string;
    //agregar al modelo tipo de user rescatista refugio o veterinaria 
}

const UserSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    username: {
        type: String,
        required: [true, 'El nombre de usuario es requerido'],
        unique: true,
        minlength: [4, 'El nombre de usuario debe tener al menos 4 caracteres'],
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida'],
        minlength: [5, 'La contraseña debe tener al menos 5 caracteres'],
    },
    email: {
        type: String,
        required: [true, 'El correo electrónico es requerido'],
        unique: true,
        match: [/.+\@.+\..+/, 'Por favor ingrese un correo electrónico válido'],
    },
    telefono: {
        type: String,
        required: [true, 'El número de teléfono es requerido'],
    },
    direccion: {
        type: String,
    },
    fechaNacimiento: {
        type: String, // Changed to Date type for better consistency
    },
    vetDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Referencing the same User model
        required: false, // The reference vet is optional
    }, 
    foto: {
        type: String,
        required: false, // The photo is optional
    }
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
