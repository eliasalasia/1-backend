
const corsOptions = {
  origin:  ['http://localhost:5173/', 'http://localhost:5174/'], // Permite solicitudes solo desde este origen
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization']
};
  
export default corsOptions