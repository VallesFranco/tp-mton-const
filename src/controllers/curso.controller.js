const {Curso, Profesor} = require('../db/models');

const controller = {};

const getCursos = async (req, res) => {
    const cursos = await Curso.findAll({});
    res.status(200).json(cursos);
};
controller.getCursos = getCursos;

const getCursoPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Curso.findByPk(id, {include: ['materia']} ));
};
controller.getCursoPorId = getCursoPorId;

const borrarCursoPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const cursoPorBorrar = await Curso.destroy({where: {id}});
        if (cursoPorBorrar)
            return res.status(200).json({mensaje: `El curso con ID ${id} se borró con éxito.`});
    } catch(err) {
        return res.status(500).json({mensaje: `Error interno al intentar borrar el curso con ID ${id}.`, error: err.message});
    }
};    
controller.borrarCursoPorId = borrarCursoPorId;

const actualizarCursoPorId = async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    const cursoPorActualizar = await Curso.findByPk(id);
    if (cursoPorActualizar) {
        await Curso.update(datosNuevos, {where: {id}});
        const cursoActualizado = await Curso.findByPk(id);
        return res.status(200).json({mensaje: `El curso con ID ${id} se actualizó con éxito.`, cursoActualizado});
    }    
};
controller.actualizarCursoPorId = actualizarCursoPorId;

const asociarProfesorAlCurso = async (req, res) => {
    const cursoId = req.params.id;
    const {id} = req.body;
    const curso = await Curso.findByPk(cursoId);
    const profesor = await Profesor.findByPk(id);
    if (!profesor) 
        return res.status(400).json({mensaje: "Debe proporcionar un ID existente de un/na profesor/ra para asociar al curso."});
    const profesorDelCurso = await curso.getProfesores({where: { id }});
    if (profesorDelCurso.length > 0) {
        return res.status(400).json({mensaje: "El/La profesor/ra ya está asociado/da al curso."});
    }
    await curso.addProfesores(profesor);
    return res.status(201).json({mensaje: `Profesor/ra asociado/da con éxito al curso con ID ${cursoId}.`});
};
controller.asociarProfesorAlCurso = asociarProfesorAlCurso;

const getProfesoresPorCurso = async (req, res) => {
    const cursoId = req.params.id;
    const cursoYProfesores = await Curso.findByPk(cursoId, {
        include: ['materia', {
            model: Profesor,
            as: 'profesores',
            through: {attributes: []}
        }]
    });
    if (cursoYProfesores.profesores.length === 0) 
        return res.status(200).json({mensaje: `El curso con ID ${cursoId} no tiene profesores.`});
    res.status(200).json(cursoYProfesores);
};
controller.getProfesoresPorCurso = getProfesoresPorCurso;

module.exports = controller;