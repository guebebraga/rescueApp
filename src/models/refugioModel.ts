import mongoose, { Document, Schema } from 'mongoose';

export interface IRefugio extends Document {
    nombre: string;
    username: string;
    password: string;
    email: string;
    telefono: string;
    direccion: string;
    vetDeReferencia?: mongoose.Schema.Types.ObjectId;
    foto?: string;
}

const RefugioSchema: Schema = new Schema({
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
        ref: 'Vet',
        required: false,
    }, 
    foto: {
        type: String,
        required: false, // La foto es opcional
    }
}, {
    timestamps: true,
});

const Refugio = mongoose.model<IRefugio>('Refugio', RefugioSchema);
export default Refugio;
