
const corsOptions = {
    origin: 'http://example.com', // Permite solicitudes solo desde este origen
    methods: ['GET', 'POST'], // Métodos HTTP permitidos
    allowedHeaders: ['Content-Type'], // Encabezados permitidos
  };
  
  app.use(cors(corsOptions));