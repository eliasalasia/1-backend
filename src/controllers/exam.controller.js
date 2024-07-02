import { Examen } from "../models/exam.js";

// Controlador para obtener todos los exámenes
export const indexExamenes = async (req, res) => {
    const examenes = await Examen.find().populate('teacher students');
    res.json(examenes);
};

// Controlador para crear un nuevo examen
export const createExamen = async (req, res) => {
    const { title, description, level, date, duration, teacher, questions } = req.body;
    if (!title || !description || !level || !date || !duration || !questions || questions.length === 0) {
        return res.status(400).json({ message: 'Please send all required fields including questions array with at least one question.' });
    }

    try {
        const newExamen = new Examen({
            title,
            description,
            level,
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

// Controlador para actualizar un examen existente
export const updateExamen = async (req, res) => {
    const { id } = req.params;
    const { title, description, date, duration, teacher, students } = req.body;
    const examen = await Examen.findByIdAndUpdate(id, {
        title,
        description,
        date,
        duration,
        teacher,
        students
    }, { new: true });
    res.json(examen);
};
// Controlador para eliminar un examen existente
export const deleteExamen = async (req, res) => {
    const { id } = req.params;
    await Examen.findByIdAndDelete(id);
    res.status(204).json();
};
