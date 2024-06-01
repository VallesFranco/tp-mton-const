const {Carrera, Materia} = require('../db/models');

const controller = {};

const getCarreras = async (req, res) => {
    const carreras = await Carrera.findAll({});
    res.status(200).json(carreras);
};
controller.getCarreras = getCarreras;

const getCarreraPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Carrera.findByPk(id));
};
controller.getCarreraPorId = getCarreraPorId;

const crearCarrera = async (req, res) => {
    const nuevaCarrera = await Carrera.create(req.body);
    res.status(201).json(nuevaCarrera);
};
controller.crearCarrera = crearCarrera;

const crearMateria = async (req, res) => {
    const carreraId = req.params.id;
    const registro = {...req.body, carreraId};
    const nuevaMateria = await Materia.create(registro);
    res.status(201).json(nuevaMateria);
};
controller.crearMateria = crearMateria;

const getMateriasPorCarrera = async (req, res) => {
    const carreraId = req.params.id;
    const materiasYCarrera = await Carrera.findByPk(carreraId, {include:['materias']});
    if (materiasYCarrera.materias.length === 0)
        return res.status(404).json({mensaje: `La carrera con ID ${carreraId} no tiene materias.`});
    res.status(200).json(materiasYCarrera);
};
controller.getMateriasPorCarrera = getMateriasPorCarrera;

module.exports = controller;