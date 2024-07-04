import videoModel from '../models/videos.js'
import { Types } from 'mongoose'
import fs from 'node:fs/promises'
import path from 'node:path'

export const index = async (req, res) => {
  try {
    const videos = await videoModel.find().populate('user').select('-__v')
    res.json(videos)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const getById = async (req, res) => {
  try {
    const { id } = req.params

    const video = await videoModel.findOne({ _id: id }).populate('user').select('-__v')
    if (!video) return res.status(404).json({ message: 'Video no encontrado' })

    res.json(video)
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const store = async (req, res) => {
  try {
    const { title, user } = req.body
    const { filename: video } = req.file

    // Crear el registro del video
    const videoNuevo = await videoModel.create({
      title, user, video
    })

    if (videoNuevo) {
      return res.status(201).json({ message: 'Video creado', data: videoNuevo })
    }

    res.status(500).json({ message: 'No se pudo crear el video' })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const update = async (req, res) => {
  try {
    const { id } = req.params
    const { title, user } = req.body
    const { filename: video } = req.file

    const videoDB = await videoModel.findOne({ _id: id }).select('-__v')

    // Eliminar video existente
    const rutaVideo = path.resolve(`./uploads/${videoDB.video}`)
    await fs.unlink(rutaVideo)

    videoDB.title = title
    videoDB.user = user
    videoDB.video = video
    videoDB.save()

    res.json({ message: 'Video actualizado', data: videoDB })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}

export const remove = async (req, res) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })

    const video = await videoModel.findOneAndDelete({ _id: id })
    if (!video) return res.status(404).json({ message: 'Video no encontrado' })

    res.json({ message: 'Video eliminado', data: video })
  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Error interno' })
  }
}