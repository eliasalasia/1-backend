import { Router } from "express";
import { vidById, vindex } from "../controllers/videos.controller.js";

const router = Router()

router.get('/videos', vindex)
router.get('/videos/:id', vidById)

export default router