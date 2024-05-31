const joi = require('joi');

const materiaSchema = joi.object().keys({
    nombre: joi.string().required().min(5).max(50).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es requerido."
    }),
    cuatrimestral: joi.number().required().valid(0, 1).messages({
        "boolean.empty": "Cuatrimestral no puede estar vacío.",
        "any.only": "Cuatrimestral debe ser 0 o 1.",
        "any.required": "Cuatrimestral es requerido."
    }),
    anio: joi.number().required().min(1).max(5).messages({
        "number.min": `El anio debe ser al menos {#limit}.`,
        "number.max": `El anio debe ser como máximo {#limit}.`,
        "number.empty": "El anio no puede estar vacío.",
        "any.required": "El anio es requerido."
    })  
});

module.exports = materiaSchema;