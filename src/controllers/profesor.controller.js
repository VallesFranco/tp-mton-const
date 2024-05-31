const {Profesor} = require('../db/models');

const controller = {};

const getProfesores = async (req, res) => {
    const profesores = await Profesor.findAll({});
    res.status(200).json(profesores);
};
controller.getProfesores = getProfesores;

const getProfesorPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Profesor.findByPk(id));
};
controller.getProfesorPorId = getProfesorPorId;

const crearProfesor = async (req, res) => {
    const nuevoProfesor = await Profesor.create(req.body);
    res.status(201).json(nuevoProfesor);
};
controller.crearProfesor = crearProfesor;

const actualizarProfesorPorId = async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const profesorPorActualizar = await Profesor.findByPk(id);
    if (profesorPorActualizar) {
        await Profesor.update(datosNuevos, {where: {id}});
        const profesorActualizado = await Profesor.findByPk(id);
        return res.status(200).json({mensaje: `El/La profesor/ra con ID ${id} se actualizó con éxito.`, profesorActualizado});
    }    
};
controller.actualizarProfesorPorId = actualizarProfesorPorId;

const borrarProfesorPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const profesorPorBorrar = await Profesor.destroy({where:{id}});
        if (profesorPorBorrar)
            return res.status(200).json({mensaje: `El/La profesor/ra con ID ${id} se borró con éxito.`});
    } catch(err) {
        return res.status(500).json({mensaje: `Error al intentar borrar el/la profesor/ra con ID ${id}.`, err});
    }
};    
controller.borrarProfesorPorId = borrarProfesorPorId;

module.exports = controller;