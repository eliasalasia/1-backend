import { connectDB } from "./config/db.js";
import express from 'express';
import { PORT } from "./config/config.js";
import { usersRoutes } from './routes/users.routes.js';
import { examRoutes } from './routes/exam.routes.js';
import  videosRoutes  from './routes/videos.routes.js';


const app = express();

connectDB();

app.use(express.json());
app.use('/',usersRoutes); // Aquí usas usersRoutes para las rutas de usuarios
app.use('/',examRoutes); // Aquí usas examRoutes para las rutas de exámenes
app.use('/videos',videosRoutes)

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;