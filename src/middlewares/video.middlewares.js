import { Types } from 'mongoose'
import videoModel from '../models/videos.js'
import User from '../models/users.js'

export const validateDataVideo = async (req, res, next) => {
  try {
    const { title, user } = req.body
    const { filename: video } = req.file
    if (!title || !user || !video) return res.status(400).json({ message: 'Datos incompletos' })
    if (!Types.ObjectId.isValid(user)) return res.status(400).json({ message: 'ID inválido' })

    const userDB = await User.findOne({ _id: user })
    if (!userDB) return res.status(404).json({ message: 'Usuario no encontrado' })

    next()
  } catch (error) {
    res.status(500).json({ message: 'Error al validar e' })
  }
}

export const validateVideoID = async (req, res, next) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })

    const video = await videoModel.findOne({ _id: id })
    if (!video) return res.status(404).json({ message: 'Video no encontrado' })
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el ID' })
  }
}

export const handleUploadVideoError = (err, req, res, next) => {
  if (err) {
    return res.status(400).json({ message: err.message })
  } else {
    next()
  }
}