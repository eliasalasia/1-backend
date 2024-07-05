
import multer from 'multer';

// Configuración de almacenamiento de archivos para Multer
const videoStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // Directorio donde se guardarán los videos
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const formattedName = originalname.trim().replace(/ /g, '').toLowerCase(); // Remover espacios y convertir a minúsculas
    const uniqueName = Date.now() + '-' + formattedName; // Crear un nombre único usando la fecha actual
    cb(null, uniqueName);
  }
});

// Filtrado de archivos para aceptar solo videos
const videoFileFilter = (req, file, cb) => {
  const { mimetype } = file;
  if (mimetype.includes('video')) {
    cb(null, true); // Aceptar archivo
  } else {
    cb(new Error('Solo se permiten archivos de video')); // Rechazar archivo
  }
};

// Middleware de Multer para manejar la carga de un solo video
const uploadSingleVideo = multer({ 
  storage: videoStorage, 
  fileFilter: videoFileFilter 
});

// Exportar el middleware configurado
export { uploadSingleVideo };

const profileImageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/profile'); // Directorio donde se guardarán las imágenes de perfil
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const formattedName = originalname.trim().replace(/ /g, '').toLowerCase(); // Remover espacios y convertir a minúsculas
    const uniqueName = Date.now() + '-' + formattedName; // Crear un nombre único usando la fecha actual
    cb(null, uniqueName);
  }
});

// Middleware de Multer para manejar la carga de una sola imagen de perfil
const uploadSingleProfileImage = multer({ 
  storage: profileImageStorage,
  fileFilter: function (req, file, cb) {
    // Validar que el archivo sea una imagen
    if (!file.mimetype.startsWith('image')) {
      return cb(new Error('Solo se permiten archivos de imagen'));
    }
    cb(null, true); // Aceptar archivo
  }
});

// Exportar el middleware configurado como uploadProfileImage
export { uploadSingleProfileImage as uploadProfileImage };