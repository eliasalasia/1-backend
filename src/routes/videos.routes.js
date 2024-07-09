import { Router } from 'express';
import { getVideoById, getAllVideos, deleteVideo, createVideo, updateVideo, sendVideo } from '../controllers/videos.controller.js';
import { handleUploadVideoError, validateVideoData, validateVideoId,  } from '../middlewares/video.middlewares.js';
import { uploadSingleVideo } from '../config/multer.js';

// Configura las rutas utilizando Router de Express
const router = Router();

router.get('/', getAllVideos); // Ejemplo de ruta GET para obtener todos los videos
router.get('/:id', validateVideoId, getVideoById); // Ruta GET con validación de ID de video
router.get('/content/:id', validateVideoId, sendVideo)
router.post('/', uploadSingleVideo.single('video'), handleUploadVideoError, validateVideoData, createVideo); // Ruta POST con validación de datos de video
router.put('/:id', validateVideoId, uploadSingleVideo.single('video'), handleUploadVideoError, validateVideoData, updateVideo); // Ruta PUT con validación de ID de video y datos de video
router.delete('/:id', validateVideoId, deleteVideo); // Ruta DELETE con validación de ID de video

// Exporta las rutas configuradas
export { router as videoRoutes };