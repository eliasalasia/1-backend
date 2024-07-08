import { Schema, model } from "mongoose";

const ExamenSchema = new Schema({
    title: { 
        type: String, 
        required: true 
    },
    description: {
        type: String,
        required: true
    },
    nivel:{
        type: String,
        enum: ['Elementary', 'A1', 'A2', 'B1'] 
    },
    date: {
        type: Date,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    students: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    questions: [{
        question: {
            type: String,
            required: true
        },
        options: {
            type: [String],
            required: true
        },
        correctAnswer: {
            type: String,
            required: true
        }
    }]
});

export const Examen = model('Examen', ExamenSchema);

