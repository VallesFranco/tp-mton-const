const {Curso, Profesor} = require('../db/models');

const controller = {};

const getCursos = async (req, res) => {
    const cursos = await Curso.findAll({});
    res.status(200).json(cursos);
};
controller.getCursos = getCursos;

const getCursoPorId = async (req, res) => {
    const cursoId = req.params.id;
    res.status(200).json(await Curso.findByPk(cursoId, {include: ['materia']} ));
};
controller.getCursoPorId = getCursoPorId;

const borrarCursoPorId = async (req, res) => {
    const id = req.params.id;
    await Curso.destroy({where: {id}});
    return res.status(200).json({mensaje: `El curso con ID ${id} se borró con éxito.`});
};    
controller.borrarCursoPorId = borrarCursoPorId;

const actualizarCursoPorId = async (req, res) => {
    const id = req.params.id;
    const datosNuevos = req.body;
    await Curso.update(datosNuevos, {where: {id}});
    const cursoActualizado = await Curso.findByPk(id);
    return res.status(200).json({mensaje: `El curso con ID ${id} se actualizó con éxito.`, curso: cursoActualizado});
};
controller.actualizarCursoPorId = actualizarCursoPorId;

const asociarProfesorAlCurso = async (req, res) => {
    const cursoId = req.params.id;
    const {id} = req.body;
    const curso = await Curso.findByPk(cursoId);
    const profesor = await Profesor.findByPk(id);
    const profesorDelCurso = await curso.getProfesores({where: {id}});
    if (!profesor)
        return res.status(400).json({mensaje: "Debe proporcionar un ID existente de un/na profesor/ra para asociar al curso."});
    if (profesorDelCurso.length > 0) 
        return res.status(400).json({mensaje: "El/La profesor/ra ya está asociado/da al curso."});
    await curso.addProfesores(profesor);
    return res.status(201).json({mensaje: `Profesor/ra asociado/da con éxito al curso con ID ${cursoId}.`});
};
controller.asociarProfesorAlCurso = asociarProfesorAlCurso;

const asociarProfesoresAlCurso = async (req, res) => {
    const cursoId = req.params.id;
    const {ids} = req.body;
    const [curso, profesores] = await Promise.all([Curso.findByPk(cursoId), 
        Profesor.findAll({where: {id:ids}}) ]);
    
    if (profesores.length !== ids.length)
        return res.status(400).json({mensaje: "Algunos de los IDs de los profesores no existen."});
    const profesoresDelCursoIds = (await curso.getProfesores()).map(p => p.id);
    const profesoresNoAsociados = profesores.filter(profesor => !profesoresDelCursoIds.includes(profesor.id));
    
    if (profesoresNoAsociados.length > 0) {
        await curso.addProfesores(profesoresNoAsociados);
        const mensaje = profesoresNoAsociados.length === profesores.length
            ?   `Todos los profesores asociados con éxito al curso con ID ${cursoId}.`
            :   `Algunos profesores asociados con éxito al curso con ID ${cursoId}.`;
        return res.status(201).json({mensaje});
    }
    return res.status(400).json({mensaje: `Todos los profesores ya están asociados al curso con ID ${cursoId}.`});
};
controller.asociarProfesoresAlCurso = asociarProfesoresAlCurso;

const getProfesoresPorCurso = async (req, res) => {
    const cursoId = req.params.id;
    const cursoYProfesores = await Curso.findByPk(cursoId, {
        include: ['materia', {
            model: Profesor,
            as: 'profesores',
            through: {attributes: []}
        }]
    });
    res.status(200).json(cursoYProfesores);
};
controller.getProfesoresPorCurso = getProfesoresPorCurso;

module.exports = controller;