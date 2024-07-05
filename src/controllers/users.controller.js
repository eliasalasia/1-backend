import { User } from "../models/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


// se obtiene todos los usuarios
export const indexUsers = async (req, res) => {
    // Obtener el token del encabezado de la solicitud.
    const token = req.headers.authorization?.split(' ')[1];

    try {
        // Verificar si hay token presente
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }

        // Decodificar el token para obtener el id y el rol del usuario.
        const decoded = jwt.verify(token, 'secretkey');
        const { id, role, nivel } = decoded; 

        // Verificar el rol para determinar el acceso.
        if (role === 'teacher') {
            // Si el usuario es un "teacher", obtiene todos los estudiantes con el mismo nivel.
            const students = await User.find(
                { role: 'student', nivel: nivel }, // Filtrar por nivel.
                '_id name lastname email role videos nivel matricula' // Proyección de campos.
            );
            res.json(students);
        } else if (role === 'student') {
            // Si el usuario es un "student", se obtenie solo su propio usuario.
            const user = await User.findById(
                id,
                '_id name lastname email role videos nivel matricula' // lo que me muestra de repuesta.
            );
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


// Crear un nuevo usuario con imagen de perfil
export const createUser = async (req, res) => {
    const { name, lastname, email, password, role, nivel } = req.body;
    const profileImage = req.file ? req.file.path : ''; // Obtener la ruta de la imagen de perfil si está presente en la solicitud
  
    if (!name || !lastname || !email || !password || !role || !nivel) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
        role,
        nivel,
        profileImage // Guardar la ruta de la imagen de perfil en el usuario nuevo
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
        const token = jwt.sign(
            { id: user._id, role: user.role, nivel: user.nivel }, 
            'secretkey', 
            { expiresIn: '1h' }
        );
        res.json({ token, user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

// Actualizar un usuario existente con imagen de perfil
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, lastname, email, role, nivel } = req.body;
    const profileImage = req.file ? req.file.path : ''; // Obtener la ruta de la imagen de perfil si está presente en la solicitud
  
    try {
      let user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      user.name = name || user.name;
      user.lastname = lastname || user.lastname;
      user.email = email || user.email;
      user.role = role || user.role;
      user.nivel = nivel || user.nivel;
      user.profileImage = profileImage || user.profileImage; // Actualizar la ruta de la imagen de perfil si se proporcionó una nueva
  
      await user.save();
      res.json({ message: 'User updated successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  };