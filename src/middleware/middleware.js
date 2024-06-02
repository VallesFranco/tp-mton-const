const existePorId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const instancia = await Modelo.findByPk(id);
        if (!instancia)
            return res.status(404).json({mensaje: `No existe ${Modelo.name} con ID ${id}.`});
        next();
    }
};

const existeElRegistro = (Modelo) => async (req, res, next) => {
    const valores = Object.fromEntries(Object.entries(req.body)
            .filter(([atributo, valor]) => Modelo.rawAttributes.hasOwnProperty(atributo) && valor !== undefined));
    if (await Modelo.findOne({where: valores})) 
        return res.status(400).json({mensaje: `${Modelo.name} ya existente.`});
    next();
};

const validarSchema = (schema) => {
    return async (req, res, next) => {
        const resultado = schema.validate(req.body, {abortEarly: false});
        if (resultado.error) {
            return res.status(400).json({
                errores: resultado.error.details
                    .map(error => ({error: error.message}))
            });
        }
        next();
    }
};

module.exports = {existePorId, existeElRegistro, validarSchema};