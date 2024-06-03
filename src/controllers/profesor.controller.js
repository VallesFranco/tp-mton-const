const {Profesor, Curso} = require('../db/models');

const controller = {};

const getProfesores = async (req, res) => {
    const profesores = await Profesor.findAll({});
    res.status(200).json(profesores);
};
controller.getProfesores = getProfesores;

const getProfesorPorId = async (req, res) => {
    const profesorId = req.params.id;
    res.status(200).json(await Profesor.findByPk(profesorId));
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
    await Profesor.update(datosNuevos, {where: {id}});
    const profesorActualizado = await Profesor.findByPk(id);
    return res.status(200).json({mensaje: `El/La profesor/ra con ID ${id} se actualizó con éxito.`, profesor: profesorActualizado}); 
};
controller.actualizarProfesorPorId = actualizarProfesorPorId;

const borrarProfesorPorId = async (req, res) => {
    const id = req.params.id;
    await Profesor.destroy({where: {id}});
    return res.status(200).json({mensaje: `El/La profesor/ra con ID ${id} se borró con éxito.`});
};    
controller.borrarProfesorPorId = borrarProfesorPorId;

const getCursosPorProfesor = async (req, res) => {
    const profesorId = req.params.id;
    const profesorYCursos = await Profesor.findByPk(profesorId, {
        include: [{
            model: Curso,
            as: 'cursos',
            through: {attributes: []},
            include: [{association: 'materia'}]
        }]
    });
    res.status(200).json(profesorYCursos);
};
controller.getCursosPorProfesor = getCursosPorProfesor;

module.exports = controller;