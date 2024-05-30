const {Router} = require('express');
const {Carrera} = require('../db/models');
const carreraController = require('../controllers/carrera.controller');
const carreraSchema = require('../schemas/carrera.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/carreras', carreraController.getCarreras);
route.get('/carreras/:id', middleware.existePorId(Carrera), carreraController.carreraPorId);
route.post('/carreras', middleware.validarSchema(carreraSchema), carreraController.crearCarrera);

module.exports = route;