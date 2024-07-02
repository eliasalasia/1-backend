import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: { 
        type: String,
        enum: ['teacher', 'student'],
        required: true 
    },
    profileImage: { 
        type: String 
    },
    videos: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Video' 
    }],
    date: {
        type: Date,
        default: Date.now
    },
    nivel: {
        type: String,
        enum: ['Elementary', 'A1', 'A2', 'B1'] 
    },
    matricula: {
        type: String,
        unique: true
    }
});

export const User = model('User', UserSchema);