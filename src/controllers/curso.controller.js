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
        const cursoPorBorrar = await Curso.destroy( {where:{id}} );
        if (cursoPorBorrar)
            return res.status(200).json(`El Curso con ID ${id} se borró con exito.`);
    } catch(err) {
        return res.status(500).json({ mensaje: `Error al intentar borrar el Curso con ID ${id}.`, err });
    }
};    
controller.borrarCursoPorId = borrarCursoPorId;

const editarCursoPorId = async (req, res) => {
    const id = req.params.id;
    const idx = data.findIndex(e => e.id == id);
    if (idx >= 0) {
        data[idx] = {id: Number(id), ...req.body};
        res.status(200).json(data[idx]);
    }
}
controller.editarCursoPorId = editarCursoPorId;

module.exports = controller;