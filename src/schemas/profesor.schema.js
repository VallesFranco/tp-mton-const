const joi = require('joi');

const profesorSchema = joi.object().keys({
    nombre: joi.string().required().min(3).max(50).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio."
    }),
    fechaNacimiento: joi.date().required().min(new Date('1950-1-1')).max(new Date('2001-1-1')).messages({
        "date.base": "La fechaNacimiento debe ser una fecha válida.",
        "date.min": `La fechaNacimiento no puede ser anterior al {#limit}.`,
        "date.max": `La fechaNacimiento no puede ser superior al {#limit}.`,
        "any.required": "La fechaNacimiento es obligatoria."
    }),
    legajo: joi.number().optional().min(15000000).max(45000000).messages({
        "number.min": `El legajo debe ser al menos {#limit}.`,
        "number.max": `El legajo debe ser como máximo {#limit}.`,
        "number.empty": "El legajo no puede estar vacío."
    }),
    activo: joi.number().required().valid(0, 1).messages({
        "boolean.empty": "activo no puede estar vacío.",
        "any.only": "activo debe ser 0 o 1.",
        "any.required": "activo es obligatorio."
    })
});

module.exports = profesorSchema;