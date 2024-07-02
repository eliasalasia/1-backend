import jwt from 'jsonwebtoken';

export const authorize = (req, res, next) => {
    // Verificar token del header de autorización
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token missing' });
    }

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, 'secretkey');
        req.user = decoded; // Guardar el usuario decodificado en la solicitud

        // Verificar si el usuario tiene permisos adecuados
        if (req.user.role !== 'teacher' && req.user.role !== 'student') {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        next(); // Permitir que la solicitud continúe si el usuario está autorizado
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
};