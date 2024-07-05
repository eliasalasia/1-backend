import { Router } from "express";
import { indexUsers, createUser, loginUser, updateUser } from "../controllers/users.controller.js";
import { authorize } from "../middlewares/jwt.middlewares.js";
import { uploadProfileImage } from "../config/multer.js"; // Ajusta la ruta de acuerdo a tu estructura de archivos

const router = Router();

// Rutas de usuario
router.get('/users', authorize, indexUsers); // Ruta para ver los usuarios si sos teacher o tu informacion si sos student
router.post('/users', uploadProfileImage.single('profileImage'), createUser); // Ruta para crear Students o Teacher con la imagen de perfil
router.post('/login', loginUser); // Ruta para logearse
router.put('/users/:id', authorize, uploadProfileImage.single('profileImage'), updateUser); // Actualizar información de usuario con la imagen de perfil

export { router as usersRoutes };