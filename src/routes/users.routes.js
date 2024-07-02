import { Router } from "express";
import { indexUsers, createUser, loginUser } from "../controllers/users.controller.js";
import { authorize } from "../middlewares/jwt.middlewares.js";

const router = Router();

// Rutas de usuario
router.get('/users', authorize, indexUsers);
router.post('/users', createUser);
router.post('/login', loginUser);

export { router as usersRoutes };