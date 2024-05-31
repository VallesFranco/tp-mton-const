const {Router} = require('express');
const {Profesor} = require('../db/models');
const profesorController = require('../controllers/profesor.controller');
const profesorSchema = require('../schemas/profesor.schema');
const middleware = require('../middleware/middleware');

const route = Router();

route.get('/profesores', profesorController.getProfesores);
route.get('/profesores/:id', middleware.existePorId(Profesor), profesorController.getProfesorPorId);
route.post('/profesores', middleware.existeElRegistro(Profesor), middleware.validarSchema(profesorSchema), profesorController.crearProfesor);
route.put('/profesores/:id', middleware.existePorId(Profesor), profesorController.actualizarProfesorPorId);
route.delete('/profesores/:id', middleware.validarUrl, middleware.existePorId(Profesor), profesorController.borrarProfesorPorId);

module.exports = route;