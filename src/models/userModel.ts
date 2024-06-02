import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    nombre: string;
    username: string;
    password: string;
    email: string;
    telefono: string;
    direccion: string;
    vetDeReferencia?: mongoose.Schema.Types.ObjectId;
    foto?: string;
    rol: 'persona' | 'refugio' | 'veterinaria'; // Agrege campo rol con las tres opciones
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
    vetDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Hace referencia al mismo modelo user
        required: false, // La vet de referencia es opcional 
    },
    foto: {
        type: String,
        required: false, //La foto es opcional 
    },
    rol: {
        type: String,
        enum: ['persona', 'refugio', 'veterinaria'], // Solo permite estos tres valores
        required: [true, 'El rol es requerido'],
    }
}, {
    timestamps: true,
});

const User = mongoose.model<IUser>('User', UserSchema);
export default User;
