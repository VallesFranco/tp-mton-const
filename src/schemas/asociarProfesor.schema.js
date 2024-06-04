const joi = require('joi');

const asociarProfesorSchema = joi.object().keys({
    ids: joi.array().items(joi.number().integer().min(1).messages({
        "number.min": "Los elementos de ids deben ser números enteros mayores a 0.",
        "number.base": "Los elementos de ids deben ser números enteros.",
        "number.integer": "Los elementos de ids deben ser números enteros."
    })).min(1).required().messages({
    "array.base": "Ids debe ser un array.",
    "array.min": "Ids no puede estar vacío.",
    "any.required": "Ids es obligatorio."
    })
});
module.exports = asociarProfesorSchema;