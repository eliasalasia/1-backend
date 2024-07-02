import { Schema, model } from "mongoose";

const ResultadoSchema = new Schema({
    examen: {
        type: Schema.Types.ObjectId,
        ref: 'Examen',
        required: true
    },
    student: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const Resultado = model('Resultado', ResultadoSchema);

