import { Resultado } from "../models/result.js";

// Controlador para obtener todos los resultados
export const indexResultados = async (req, res) => {
    const resultados = await Resultado.find().populate('examen student');
    res.json(resultados);
};

// Controlador para crear un nuevo resultado
export const createResultado = async (req, res) => {
    const { examen, student, score } = req.body;
    if (!examen || !student || score === undefined) {
        return res.status(400).json({ message: 'Please. Send all required fields' });
    }
    const newResultado = new Resultado({
        examen,
        student,
        score
    });
    await newResultado.save();
    res.status(201).json({ message: 'Resultado created' });
};

// Controlador para obtener un resultado específico por su ID
export const getResultado = async (req, res) => {
    const { id } = req.params;
    const resultado = await Resultado.findById(id).populate('examen student');
    if (!resultado) {
        return res.status(404).json({ message: 'Resultado not found' });
    }
    res.json(resultado);
};

// Controlador para actualizar un resultado existente
export const updateResultado = async (req, res) => {
    const { id } = req.params;
    const { examen, student, score } = req.body;
    const resultado = await Resultado.findByIdAndUpdate(id, {
        examen,
        student,
        score
    }, { new: true }).populate('examen student');
    if (!resultado) {
        return res.status(404).json({ message: 'Resultado not found' });
    }
    res.json(resultado);
};

// Controlador para eliminar un resultado existente
export const deleteResultado = async (req, res) => {
    const { id } = req.params;
    await Resultado.findByIdAndDelete(id);
    res.status(204).json();
};
