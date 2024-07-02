import videoModel from "../models/videos"

export const vids = async (req, res) => {
   try {
    const videos = await videoModel.find().populate('name','email')
    res.json(videos)
}catch (error) {
     return res.status(500).json({ message: 'Error interno'})
   }
} 