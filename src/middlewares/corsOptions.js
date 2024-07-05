
const corsOptions = {
    origin: 'http://localhost:5173', // Permite solicitudes solo desde este origen
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos
  };
  
export default corsOptions