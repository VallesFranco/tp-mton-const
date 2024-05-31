const joi = require('joi');

const cursoSchema = joi.object().keys({
    comision: joi.string().optional().pattern(/^(?=.*[A-Z])(?=.*[1-9])[A-Z1-9]{2}$/).messages({
        "string.pattern.base": `La comisión solo puede tener una letra mayúscula y un número del 1 al 9.`
    }),
    turno: joi.string().required().min(5).max(6).messages({
        "string.min": `El turno debe tener al menos {#limit} caracteres.`,
        "string.max": `El turno debe tener como máximo {#limit} caracteres.`,
        "string.empty": "El turno no puede estar vacío.",
        "any.required": "El turno es obligatoria."
    }),
    fechaInicio: joi.date().required().min(new Date('2015-3-20')).max('now').messages({
        "date.base": "La fechaInicio debe ser una fecha válida.",
        "date.min": `La fechaInicio no puede ser anterior al {#limit}.`,
        "date.max": "La fechaInicio no puede ser en el futuro.",
        "any.required": "La fechaInicio es obligatoria."
    }),
    fechaFin: joi.date().required().min(new Date('2015-6-20')).max(new Date('2030-12-20')).messages({
        "date.base": "La fechaFin debe ser una fecha válida.",
        "date.min": `La fechaFin no puede ser anterior al {#limit}.`,
        "date.max": `La fechaFin no puede ser superior al {#limit}.`,
        "any.required": "La fechaFin es obligatoria."
    })    
});

module.exports = cursoSchema;