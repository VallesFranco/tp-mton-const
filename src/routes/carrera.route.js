const {Router} = require('express');
const {Carrera, Materia} = require('../db/models');
const carreraController = require('../controllers/carrera.controller');
const carreraSchema = require('../schemas/carrera.schema');
const materiaSchema = require('../schemas/materia.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/carreras', carreraController.getCarreras);
route.get('/carreras/:id', middleware.existePorId(Carrera), carreraController.getCarreraPorId);
route.post('/carreras', middleware.existeElRegistro(Carrera), middleware.validarSchema(carreraSchema), carreraController.crearCarrera);
route.post('/carreras/:id/materia', middleware.existePorId(Carrera), middleware.existeElRegistro(Materia), middleware.validarSchema(materiaSchema), carreraController.crearMateria);
route.get('/carreras/:id/materias', middleware.existePorId(Carrera), carreraController.getMateriasPorCarrera);

module.exports = route;