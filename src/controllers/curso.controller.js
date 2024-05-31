const {Curso} = require('../db/models');

const controller = {};

const getCursos = async (req, res) => {
    const cursos = await Curso.findAll({});
    res.status(200).json(cursos);
};
controller.getCursos = getCursos;

const getCursoPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Curso.findByPk(id));
};
controller.getCursoPorId = getCursoPorId;

const borrarCursoPorId = async (req, res) => {
    const id = req.params.id;
    try {
        const cursoPorBorrar = await Curso.destroy({where:{id}});
        if (cursoPorBorrar)
            return res.status(200).json({mensaje: `El curso con ID ${id} se borró con éxito.`});
    } catch(err) {
        return res.status(500).json({mensaje: `Error al intentar borrar el curso con ID ${id}.`, err});
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

module.exports = controller;