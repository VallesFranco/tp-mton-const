const {Router} = require('express');
const {Curso} = require('../db/models');
const cursoController = require('../controllers/curso.controller');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/cursos', cursoController.getCursos);
route.get('/cursos/:id', middleware.existePorId(Curso), cursoController.getCursoPorId);
route.delete('/cursos/:id', middleware.validarUrl, middleware.existePorId(Curso), cursoController.borrarCursoPorId);
route.put('/cursos/:id', middleware.existePorId(Curso), cursoController.editarCursoPorId);

module.exports = route;