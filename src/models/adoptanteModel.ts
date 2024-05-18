import mongoose, { Document, Schema } from 'mongoose';

//Interfaz para el esquema de adoptante
export interface IAdoptante extends Document {
    nombre: string;
    email: string;
    telefono: string;
    direccion: string;
    fechaNacimiento: Date;
    farmaciaDeReferencia: string; 
}

// Esquema de Mongoose para Adoptante
const AdoptanteSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
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
        match: [/^\+?\d{10,15}$/, 'Por favor ingrese un número de teléfono válido'],
    },
    direccion: {
        type: String,
        required: [true, 'La dirección es requerida'],
    },
    fechaNacimiento: {
        type: Date,
        required: [true, 'La fecha de nacimiento es requerida'],
    },
    farmaciaDeReferencia: {
        type: String,
        required: [true, 'La farmacia de referencia es requerida'],
    },
}, {
    timestamps: true,
});



// Exportar el modelo
const Adoptante = mongoose.model<IAdoptante>('Adoptante', AdoptanteSchema);
export default Adoptante;
