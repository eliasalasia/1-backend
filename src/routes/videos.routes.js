import { Router } from 'express'
import { getById, index, remove, store, update } from '../controllers/videos.controller.js'
import { handleUploadVideoError, validateDataVideo, validateVideoID } from '../middlewares/video.middlewares.js'
import { uploadVideos } from '../config/multer.js'

const router = Router()

router.get('/', index)
router.get('/:id', validateVideoID, getById)
router.post('/', uploadVideos.single('video'), handleUploadVideoError, validateDataVideo, store)
router.put('/:id', validateVideoID, uploadVideos.single('video'), handleUploadVideoError, validateDataVideo, update)
router.delete('/:id', validateVideoID, remove)

export default router