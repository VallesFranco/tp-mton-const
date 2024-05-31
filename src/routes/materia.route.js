const {Router} = require('express');
const {Materia} = require('../db/models');
const materiaController = require('../controllers/materia.controller');
const materiaSchema = require('../schemas/materia.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/materias', materiaController.getMaterias);
route.get('/materias/:id', middleware.existePorId(Materia), materiaController.getMateriaPorId);
route.delete('/materias/:id', middleware.validarUrl, middleware.existePorId(Materia), materiaController.borrarMateriaPorId);

module.exports = route;