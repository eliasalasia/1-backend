import Video from '../models/videos.js';
import { Types } from 'mongoose';
import fs from 'node:fs/promises';
import path from 'node:path';

export const getAllVideos = async (req, res) => {
  try {
    const { userId } = req.query;
    const query = userId ? { user: userId } : { user: req.user._id };
    const videos = await Video.find(query).populate('user').select('-__v');
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
      console.log('req.user:', req.user); // Log para depuración
      console.log('req.body:', req.body); // Log para depuración
      console.log('req.file:', req.file); // Log para depuración

      const { title } = req.body;
      const { filename: video } = req.file;

      // Ya no necesitamos verificar el rol aquí, lo hacemos en el middleware validateVideoData

      // Crear el registro del video
      const newVideo = await Video.create({
          title,
          user: req.user._id, // Usamos el ID del usuario autenticado
          video
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

export const sendVideo = async (req, res) =>{
  try {
    const { id } = req.params;

    const video = await Video.findOne({ _id: id }).populate('user', '-password -__v').select('-__v');
    if (!video) return res.status(404).json({ message: 'Video no encontrado' });

    const {video: videoName} = video
    const rutaVideo = path.resolve(`./uploads/${videoName}`)
    const existVideo = await fs.stat(rutaVideo)
  
    if (!existVideo) {
    return res.status(404).json({message: 'The video does not exist'})
    }
    res.sendFile(rutaVideo)
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error interno' });
  }
};