import { Schema, Types, model } from "mongoose";
import User from './users.js'

const videoSchema = new Schema({
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

})

const videoModel = model('Video', videoSchema)

export default videoModel