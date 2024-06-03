const joi = require('joi');

const asociarProfesorSchema = joi.object().keys({
    ids: joi.array().items(joi.number().integer().min(1).required().messages({
        'number.base': 'Cada elemento en el campo ids debe ser un número.',
        'number.integer': 'Cada elemento en el campo ids debe ser un número entero.',
        'number.min': 'Cada elemento en el campo ids debe ser mayor a 0.',
        'any.required': 'Cada elemento en el campo ids es requerido.'
    })).required().messages({
    'array.base': 'El campo id debe ser un arreglo.',
    'array.includes': 'Cada elemento en el campo ids debe ser un número entero mayor a 0.',
    'any.required': 'El campo ids es requerido.'
    })
});
module.exports = asociarProfesorSchema;