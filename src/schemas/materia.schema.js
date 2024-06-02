const joi = require('joi');

const materiaSchema = joi.object().keys({
    nombre: joi.string().required().min(5).max(50).messages({
        "string.min": `El nombre debe tener al menos {#limit} caracteres.`,
        "string.max": `El nombre debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio."
    }),
    cuatrimestral: joi.number().required().valid(0, 1).messages({
        "boolean.empty": "Cuatrimestral no puede estar vacío.",
        "any.only": "Cuatrimestral debe ser 0 o 1.",
        "any.required": "Cuatrimestral es obligatorio."
    }),
    anio: joi.number().required().valid(1, 2, 3, 4, 5).messages({
        "number.empty": "El anio no puede estar vacío.",
        "any.only": "El anio debe ser uno de los siguientes valores: 1, 2, 3, 4, 5",
        "any.required": "El anio es obligatorio."
    })  
});

module.exports = materiaSchema;