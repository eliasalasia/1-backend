import jwt from 'jsonwebtoken';
import User from '../models/users.js'; // Asegúrate de importar el modelo de usuario

export const authorize = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        const decoded = jwt.verify(token, 'secretkey');
        
        // Buscar el usuario en la base de datos
        const user = await User.findById(decoded.id);
        
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Guardar el usuario completo en la solicitud
        req.user = user;

        // Verificar si el usuario tiene permisos adecuados
        if (user.role !== 'teacher' && user.role !== 'student') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next();
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};