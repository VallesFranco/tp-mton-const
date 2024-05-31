const existePorId = (Modelo) => {
    return async (req, res, next) => {
        const id = req.params.id;
        const instancia = await Modelo.findByPk(id);
        const modelo = (Modelo.options && Modelo.options.name && Modelo.options.name.singular) || Modelo.name;
        if (!instancia) {
            return res.status(404).json({ mensaje: `No existe ${modelo} con ID ${id}.` });
        }
        next();
    }
};

const validarSchema = (schema) => {
    return async (req, res, next) => {
        const resultado = schema.validate(req.body, { abortEarly: false });
        if (resultado.error) {
            return res.status(400).json({
                errores: resultado.error.details
                    .map(error => ({ error: error.message }))
            });
        }
        next();
    }
};

const validarUrl = (req, res, next) => {
    const id = req.params.id;
    if (!/^\d+$/.test(id) || parseInt(id, 10) === 0) 
        return res.status(500).json({ mensaje: `Error: el ID debe ser un número entero positivo.` });
    next();
};

module.exports = {existePorId, validarSchema, validarUrl};