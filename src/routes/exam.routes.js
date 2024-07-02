import { Router } from "express";
import { indexExamenes, createExamen, updateExamen, deleteExamen } from "../controllers/exam.controller.js";
import { authorize } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Rutas de examen
router.get('/student/examenes', authorize, indexExamenes); // Ver examenes disponibles para el estudiante
router.get('/teacher/examenes', authorize, indexExamenes); // Ver examenes por nivel para el maestro
router.post('/teacher/examenes', authorize, createExamen); // Crear un nuevo examen
router.put('/teacher/examenes/:id', authorize, updateExamen); // Editar un examen existente
router.delete('/teacher/examenes/:id', authorize, deleteExamen); // Eliminar un examen existente

export { router as examRoutes };