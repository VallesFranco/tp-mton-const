const joi = require('joi');

const cursoSchema = joi.object().keys({
    comision: joi.string().optional().regex(/^[A-Z][1-9]$/).messages({
        "string.pattern.base": `La comisión solo puede tener una letra mayúscula y un número del 1 al 9.`
    }),
    turno: joi.string().valid('Mañana', 'Tarde', 'Noche').messages({
        "string.empty": "El turno no puede estar vacío.",
        "any.only": "El turno debe ser uno de los siguientes valores: Mañana, Tarde, Noche.",
        "any.required": "El turno es obligatorio."
    }),
    fechaInicio: joi.date().required().messages({
        "date.base": "La fechaInicio debe ser una fecha válida.",
        "any.required": "La fechaInicio es obligatoria."
    }),
    fechaFin: joi.date().required().messages({
        "date.base": "La fechaFin debe ser una fecha válida.",
        "any.required": "La fechaFin es obligatoria."
    })    
});

module.exports = cursoSchema;