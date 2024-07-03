import videoModel from "../models/videos.js"
import { Types } from "mongoose"

export const vindex = async (req, res) => {
   try {
    const videos = await videoModel.find().populate('user','name email')
    res.json(videos)
}catch (error) {
   console.log(error);
     return res.status(500).json({ message: 'Error interno'})
   }
} 

export const vidById = async (req, res) => {
   try {
      const { id } = req.params

      if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID invalido'})

     const video = await videoModel.findOne({ _id: id }).populate('user', 'name email')  
     
     if (!video) return res.status(404).json({ message: 'Video no encontrado'})
     
     res.json(video)
   } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error interno'}) 
   }
}