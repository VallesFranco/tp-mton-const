const {Router} = require('express');
const {Curso} = require('../db/models');
const cursoController = require('../controllers/curso.controller');
const asociarProfesorSchema = require('../schemas/asociarProfesor.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/cursos', cursoController.getCursos);
route.get('/cursos/:id', middleware.existePorId(Curso), cursoController.getCursoPorId);
route.delete('/cursos/:id', middleware.existePorId(Curso), middleware.simularBorrar(cursoController.borrarCursoPorId), cursoController.borrarCursoPorId);
route.put('/cursos/:id', middleware.existePorId(Curso), cursoController.actualizarCursoPorId);
route.post('/cursos/:id/profesores', middleware.existePorId(Curso), middleware.validarSchema(asociarProfesorSchema), cursoController.asociarProfesoresAlCurso);
route.get('/cursos/:id/profesores', middleware.existePorId(Curso), middleware.validarNoVacio(Curso, 'profesores'), cursoController.getProfesoresPorCurso);

module.exports = route;