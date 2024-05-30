const {Carrera} = require('../db/models');

const controller = {};

const getCarreras = async (req, res) => {
    const carreras = await Carrera.findAll({});
    res.status(200).json(carreras);
};
controller.getCarreras = getCarreras;

const carreraPorId = async (req, res) => {
    const id = req.params.id;
    res.status(200).json(await Carrera.findByPk(id));
};
controller.carreraPorId = carreraPorId;

const crearCarrera = async (req, res) => {
    const carrera = await Carrera.create(req.body);
    res.status(201).json(carrera);
};
controller.crearCarrera = crearCarrera;

module.exports = controller;