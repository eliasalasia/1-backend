import { Types } from 'mongoose';
import Video from '../models/videos.js';
import multer from 'multer';

export const validateVideoData = async (req, res, next) => {
    try {
        const { title } = req.body;
        
        if (!title) {
            return res.status(400).json({ message: 'El título es requerido' });
        }

        // Verificar el rol del usuario solo si está presente
        if (req.user && req.user.role !== 'student') {
            return res.status(403).json({ message: 'Acceso no autorizado' });
        }

        // El archivo de video es opcional en actualizaciones
        if (req.file) {
            req.videoFile = req.file.filename;
        }

        next();
    } catch (error) {
        res.status(500).json({ message: 'Error al validar datos de video' });
    }
};

export const validateVideoId = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'ID de video inválido' });
        }

        const video = await Video.findOne({ _id: id }).populate('user', '-password');
        if (!video) {
            return res.status(404).json({ message: 'Video no encontrado' });
        }

        req.video = video;
        next();
    } catch (error) {
        console.error('Error al validar ID de video:', error);
        res.status(500).json({ message: 'Error interno' });
    }
};

export const handleUploadVideoError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({ message: 'Error al subir el video', error: err.message });
    } else if (err) {
        return res.status(500).json({ message: 'Error al subir el video', error: err.message });
    }
    next();
}; 