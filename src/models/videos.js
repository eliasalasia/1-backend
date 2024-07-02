import { Schema, Types, model } from "mongoose";

const videoSchema = new Schema({
    video: {
        type: String,
        required: true
    },
    titulo: {
        type: String,
        required: true,
    },
    usuario: {
        type: Types.ObjectId,
        required: true,
        ref: ''
    }

})

const videoModel = model('Video', videoSchema)

export default videoModel