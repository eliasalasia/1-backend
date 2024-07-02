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

// Crear un nuevo usuario
export const createUser = async (req, res) => {
    const { name, email, password, role, nivel, matricula } = req.body;
    if (!name || !email || !password || !role || !nivel || !matricula) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role,
            nivel,
            matricula
        });
        await newUser.save();
        res.status(201).json({ message: 'User created' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// para logearse con matricula
export const loginUser = async (req, res) => {
    const { matricula, password } = req.body;
    try {
        const user = await User.findOne({ matricula });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ id: user._id, role: user.role }, 'secretkey', { expiresIn: '1h' });
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};