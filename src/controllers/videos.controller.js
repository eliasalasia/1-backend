import Video from '../models/videos.js';
import { Types } from 'mongoose';
import fs from 'node:fs/promises';
import path from 'node:path';

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate('user').select('-__v');
    res.json(videos);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const getVideoById = async (req, res) => {
  try {
    const { id } = req.params;

    const video = await Video.findOne({ _id: id }).populate('user', '-password -__v').select('-__v');
    if (!video) return res.status(404).json({ message: 'Video no encontrado' });

    res.json(video);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
};

export const createVideo = async (req, res) => {
  try {
      const { title, user } = req.body;
      const { filename: video } = req.file;

      // Verificar si el usuario es estudiante
      if (req.user.role !== 'student') {
          return res.status(403).json({ message: 'Acceso no autorizado' });
      }

      // Crear el registro del video
      const newVideo = await Video.create({
          title, user, video
      });

      // Asignar el video al usuario
      req.user.videos.push(newVideo._id);
      await req.user.save();

      return res.status(201).json({ message: 'Video creado', data: newVideo });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error interno' });
  }
};

export const updateVideo = async (req, res) => {
  try {
      const { id } = req.params;
      const { title } = req.body;

      const videoDB = await Video.findOne({ _id: id }).select('-__v');
      if (!videoDB) return res.status(404).json({ message: 'Video no encontrado' });

      // Actualizar el título
      videoDB.title = title;

      // Si se subió un nuevo video, actualizar y eliminar el antiguo
      if (req.file) {
          const oldVideoPath = path.resolve(`./uploads/${videoDB.video}`);
          await fs.unlink(oldVideoPath).catch(err => console.log('Error eliminando archivo antiguo:', err));

          videoDB.video = req.file.filename;
      }

      await videoDB.save();

      res.json({ message: 'Video actualizado', data: videoDB });
  } catch (error) {
      console.log(error);
      return res.status(500).json({ message: 'Error interno' });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' });

    const video = await Video.findOneAndDelete({ _id: id });
    if (!video) return res.status(404).json({ message: 'Video no encontrado' });

    res.json({ message: 'Video eliminado', data: video });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
};