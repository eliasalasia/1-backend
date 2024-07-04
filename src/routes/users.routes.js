import { Router } from "express";
import { indexUsers, createUser, loginUser } from "../controllers/users.controller.js";
import { authorize } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Rutas de usuario
router.get('/users', authorize, indexUsers); // Ruta para ver los usuarios si sos teacher o tu informacion si sos student
router.post('/users', createUser); //Ruta para crear Students o Teacher
router.post('/login', loginUser); //Ruta para logearse

export { router as usersRoutes };