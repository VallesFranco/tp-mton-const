const {Materia} = require('../db/models');

const controller = {};

const getMaterias = async (req, res) => {
    const materias = await Materia.findAll({});
    res.status(200).json(materias);
};
controller.getMaterias = getMaterias;

const getMateriaPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Materia.findByPk(id));
};
controller.getMateriaPorId = getMateriaPorId;

const borrarMateriaPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const materiaPorBorrar = await Materia.destroy( {where:{id}} );
        if (materiaPorBorrar)
            return res.status(200).json(`La Materia con ID ${id} se borró con exito.`);
    } catch(err) {
        return res.status(500).json({ mensaje: `Error al intentar borrar la Materia con ID ${id}.`, err });
    }
};    
controller.borrarMateriaPorId = borrarMateriaPorId;

module.exports = controller;