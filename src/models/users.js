import { Schema, model } from 'mongoose';
import AutoIncrementFactory from 'mongoose-sequence';
import mongoose from 'mongoose';  // Añade esta línea para importar mongoose

const AutoIncrement = AutoIncrementFactory(mongoose.connection);

const UserSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    lastname: { 
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
        type: Number,
        unique: true
    }
});

// Aplicar el plugin de auto-incremento al esquema
UserSchema.plugin(AutoIncrement, { inc_field: 'matricula', start_seq: 202400 });

export const User = model('User', UserSchema);

export default User;