const joi = require('joi');

const carreraSchema = joi.object().keys({
    nombre: joi.string().required().min(10).max(100).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio."
    }),
    grado: joi.string().required().valid('Pregrado', 'Grado', 'Posgrado').messages({
        "string.empty": "El grado no puede estar vacío.",
        "any.only": "El grado debe ser uno de los siguientes valores: Pregrado, Grado, Posgrado",
        "any.required": "El grado es obligatorio."
    }),
    universidad: joi.string().required().min(3).max(6).messages({
        "string.min": `La universidad debe tener al menos {#limit} caracteres.`,
        "string.max": `La universidad debe tener como máximo {#limit} caracteres.`,
        "string.empty": "La universidad no puede estar vacía.",
        "any.required": "La universidad es obligatoria."
    })    
});

module.exports = carreraSchema;