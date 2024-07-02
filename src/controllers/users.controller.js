import { User } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// Obtener todos los usuarios
export const indexUsers = async (req, res) => {
    // Obtener el token del encabezado de la solicitud
    const token = req.headers.authorization?.split(' ')[1];
    
    try {
        // Verificar si hay token presente
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decodificar el token para obtener el id y el rol del usuario
        const decoded = jwt.verify(token, 'secretkey');
        const { id, role } = decoded;

        // Verificar el rol para determinar el acceso
        if (role === 'teacher') {
            // Si el usuario es un teacher, obtener todos los usuarios
            const users = await User.find();
            res.json(users);
        } else if (role === 'student') {
            // Si el usuario es un student, obtener solo su propio usuario
            const user = await User.findById(id);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            res.json(user);
        } else {
            // Rol no reconocido
            return res.status(403).json({ message: 'Forbidden' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// para crear un nuevo usuario
export const createUser = async (req, res) => {
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ message: 'Please. Send all required fields' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        role
    });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
};

// para logearse
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
    res.json({ token, user });
};