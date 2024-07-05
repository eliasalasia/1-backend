import { connectDB } from './config/db.js';
import express from 'express';
import { PORT } from './config/config.js';
import { usersRoutes } from './routes/users.routes.js';
import { examRoutes } from './routes/exam.routes.js';
import { videoRoutes } from './routes/videos.routes.js';
import cors from 'cors';
import corsOptions from './middlewares/corsOptions.js'; // Asegúrate de tener correctamente configurado corsOptions

const app = express();

connectDB();

// Middleware para manejar CORS
app.use(cors(corsOptions));

app.use(express.json());

// Tus rutas aquí
app.use('/', usersRoutes);
app.use('/', examRoutes);
app.use('/videos', videoRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));

export default app;