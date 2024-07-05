import { Schema, Types, model } from 'mongoose';
import User from './users.js';

const VideoSchema = new Schema({
    video: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    user: {
        type: Types.ObjectId,
        required: true,
        ref: User
    }
});

const Video = model('Video', VideoSchema);

export default Video;