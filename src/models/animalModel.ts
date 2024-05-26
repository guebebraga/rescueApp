import mongoose, { Document, Schema } from 'mongoose';

export interface IAnimal extends Document {
    nombre: string;
    edad: string;
    foto?: string;
    tamaño: 'pequeño' | 'mediano' | 'grande'; // Solo estos tres tamaños son permitidos
    rescatistaDeReferencia?: mongoose.Schema.Types.ObjectId; 
    refugioDeReferencia?: mongoose.Schema.Types.ObjectId; 
    vetDeReferencia?: mongoose.Schema.Types.ObjectId;
}

const AnimalSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    }, 
    edad: {
        type: String,
        required: [true, 'La edad es requerida'],
    },
    foto: {
        type: String,
        required: false, // La foto es opcional
    },
    tamaño: {
        type: String,
        enum: ['pequeño', 'mediano', 'grande'], // Solo permite estos tres valores
        required: [true, 'El tamaño es requerido'],
    },
    rescatistaDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rescatista',
        required: false, 
    }, 
    vetDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vet',
        required: false, 
    }, 
}, {
    timestamps: true,
});

const Animal = mongoose.model<IAnimal>('Animal', AnimalSchema);
export default Animal;

/*
import mongoose, { Document, Schema } from 'mongoose';

export interface IAnimal extends Document {
    nombre: string;
    edad: string;
    foto?: string;
    tamaño?: 'pequeño' | 'mediano' | 'grande'; // Solo estos tres tamaños son permitidos
    rescatistaDeReferencia?: mongoose.Schema.Types.ObjectId; 
    refugioDeReferencia?: mongoose.Schema.Types.ObjectId; 
    vetDeReferencia?: mongoose.Schema.Types.ObjectId;
}

const AnimalSchema: Schema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    }, 
    edad: {
        type: String,
        required: [true, 'La edad es requerida'],
    },
    foto: {
        type: String,
        required: false, // La foto es opcional
    },
    tamaño: {
        type: String,
        enum: ['pequeño', 'mediano', 'grande'], // Solo permite estos tres valores
        required: false,
    },
    rescatistaDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rescatista',
        required: false, 
    }, 
    vetDeReferencia: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vet',
        required: false, 
    }, 
}, {
    timestamps: true,
});

const Animal = mongoose.model<IAnimal>('Animal', AnimalSchema);
export default Animal;
*/