import { Examen } from "../models/exam.js";
import jwt from 'jsonwebtoken';

// Controlador para obtener todos los exámenes // estudiantes
export const indexExamenes = async (req, res) => {

    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const examenes = await Examen.find({ nivel: decoded.nivel }).populate('students');

    if (examenes.nivel !== decoded.nivel) {
        res.json(examenes)
    }
};
// Controlador para crear un nuevo examen // profesor
export const createExamen = async (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    const { title, description, nivel, date, duration, teacher, questions } = req.body;
    if (!title || !description || !nivel || !date || !duration || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Please send all required fields including questions array with at least one question.' });
    }

    try {

        if (decoded.role !== "teacher") {
            res.status(400).json({ message: 'Credeciales invalidas' })
        }
        const newExamen = new Examen({
            title,
            description,
            nivel,
            date,
            duration,
            teacher,
            questions
        });

        await newExamen.save();
        res.status(201).json({ message: 'Examen created', examen: newExamen });

    } catch (error) {
        console.error('Error creating examen:', error.message);
        res.status(500).json({ message: 'Server error' });
    }
};
// Controlador para actualizar un examen existente // profesor
export const updateExamen = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');

    function isObjectEmpty(obj) {
        return Object.keys(obj).length === 0;
    }

    try {
        // Filtra los campos no definidos
        if (decoded.role !== "teacher") {
            return res.status(404).json({ message: 'Credenciales invalidas' })
        }

        for (let key in updateData) {
            if (updateData[key] === undefined) {
                delete updateData[key];
            }
        }

        if (isObjectEmpty(updateData)) {
            return res.status(400).json({ message: 'No se a seleccionado ningun campo para editar' })
        }

        // Actualiza solo los campos definidos en el cuerpo de la solicitud
        const examen = await Examen.findByIdAndUpdate(id, updateData, { new: true });

        if (!examen) {
            return res.status(404).json({ message: 'Examen no encontrado' });
        }

        /*    res.json(examen); */
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

};
// Controlador para eliminar un examen existente profesor
export const deleteExamen = async (req, res) => {
    const { id } = req.params;
    const token = req.headers.authorization?.split(' ')[1];
    const decoded = jwt.verify(token, 'secretkey');
    try {
        if (decoded.role !== 'teacher') {
            return res.status(404).json({ message: 'Credenciales invalidas' })
        }
        await Examen.findByIdAndDelete(id);
        res.status(204).json({ message: 'examen eliminado con exito' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};