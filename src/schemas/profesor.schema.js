const joi = require('joi');

const profesorSchema = joi.object().keys({
    nombre: joi.string().required().min(3).max(50).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio."
    }),
    fechaNacimiento: joi.date().required().messages({
        "date.base": "La fechaNacimiento debe ser una fecha válida.",
        "any.required": "La fechaNacimiento es obligatoria."
    }),
    legajo: joi.number().optional().min(10000000).max(99999999).messages({
        "number.min": `El legajo debe ser al menos {#limit}.`,
        "number.max": `El legajo debe ser como máximo {#limit}.`,
        "number.empty": "El legajo no puede estar vacío."
    }),
    activo: joi.number().required().valid(0, 1).messages({
        "boolean.empty": "Activo no puede estar vacío.",
        "any.only": "Activo debe ser 0 o 1.",
        "any.required": "Activo es obligatorio."
    })
});

module.exports = profesorSchema;