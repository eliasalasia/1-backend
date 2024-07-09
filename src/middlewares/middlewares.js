import { Types } from 'mongoose'

export const validateID = (req, res, next) => {
  try {
    const { id } = req.params
    if (!Types.ObjectId.isValid(id)) return res.status(400).json({ message: 'ID inválido' })
    next()
  } catch (error) {
    res.status(500).json({ message: 'Error al validar el ID' })
  }
}

export const validateCORS = (req, res, next) => {
  try {
    const { origin } = req.headers
    const allowed = ['http://localhost:5173']

    if (allowed.includes(origin) || !origin) {
      res.setHeader('Access-Control-Allow-Origin', origin ?? '')
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      next()
    } else {
      res.status(403).json({ message: 'Error de CORS' })
    }
  } catch (error) {
    res.status(500).json({ message: 'Error interno al validar CORS' })
  }
} 