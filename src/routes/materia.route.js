const {Router} = require('express');
const {Materia, Curso} = require('../db/models');
const materiaController = require('../controllers/materia.controller');
const cursoSchema = require('../schemas/curso.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/materias', materiaController.getMaterias);
route.get('/materias/:id', middleware.existePorId(Materia), materiaController.getMateriaPorId);
route.delete('/materias/:id', middleware.validarUrl, middleware.existePorId(Materia), materiaController.borrarMateriaPorId);
route.post('/materias/:id/curso', middleware.existePorId(Materia), middleware.existeElRegistro(Curso), middleware.validarSchema(cursoSchema), materiaController.crearCurso);
route.get('/materias/:id/cursos', middleware.existePorId(Materia), materiaController.getCursosPorMateria);

module.exports = route;