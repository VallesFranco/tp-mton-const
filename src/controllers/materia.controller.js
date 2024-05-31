const {Materia} = require('../db/models');
const {Curso} = require('../db/models');

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
        const materiaPorBorrar = await Materia.destroy({where:{id}});
        if (materiaPorBorrar)
            return res.status(200).json({mensaje: `La materia con ID ${id} se borró con éxito.`});
    } catch(err) {
        return res.status(500).json({mensaje: `Error al intentar borrar la materia con ID ${id}.`, err});
    }
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
    const cursosYMateria = await Materia.findByPk(materiaId, {include:['cursos']});
    if (cursosYMateria.cursos.length === 0) {
        return res.status(404).json({mensaje: `La materia con ID ${materiaId} no tiene cursos.`});
    }
    res.status(200).json(cursosYMateria);
};
controller.getCursosPorMateria = getCursosPorMateria;

module.exports = controller;