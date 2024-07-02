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
    }
});

export const User = model('User', UserSchema);