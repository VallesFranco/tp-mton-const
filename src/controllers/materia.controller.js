const {Materia, Curso} = require('../db/models');

const controller = {};

const getMaterias = async (req, res) => {
    const materias = await Materia.findAll({});
    res.status(200).json(materias);
};
controller.getMaterias = getMaterias;

const getMateriaPorId = async (req, res) => {
    const materiaId = req.params.id;
    res.status(200).json(await Materia.findByPk(materiaId));
};
controller.getMateriaPorId = getMateriaPorId;

const borrarMateriaPorId = async (req, res) => {
    const id = req.params.id;
    await Materia.destroy({where: {id}});
    return res.status(200).json({mensaje: `La materia con ID ${id} se borró con éxito.`});
};    
controller.borrarMateriaPorId = borrarMateriaPorId;

const crearCurso = async (req, res) => {
    const materiaId = req.params.id;
    const registro = { ...req.body, materiaId };
    const nuevoCurso = await Curso.create(registro);
    res.status(201).json(nuevoCurso);
};
controller.crearCurso = crearCurso;

const getCursosPorMateria = async (req, res) => {
    const materiaId = req.params.id;
    const cursosYMateria = await Materia.findByPk(materiaId, {include: ['cursos']});
    res.status(200).json(cursosYMateria);
};
controller.getCursosPorMateria = getCursosPorMateria;

module.exports = controller;