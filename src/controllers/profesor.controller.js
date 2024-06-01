const {Profesor, Curso} = require('../db/models');

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

const getCursosPorProfesor = async (req, res) => {
    const profesorId = req.params.id;
    const profesorYCursos = await Profesor.findByPk(profesorId, {
        include: [{
            model: Curso,
            as: 'cursos',
            through: {attributes: []},
            include: [{
              association: 'materia'
            }]
        }]
    });
    if (profesorYCursos.cursos.length === 0) 
        return res.status(404).json({mensaje: `El/La profesor/ra con ID ${profesorId} no tiene cursos.`});
    res.status(200).json(profesorYCursos);
};
controller.getCursosPorProfesor = getCursosPorProfesor;

module.exports = controller;