require('dotenv').config();

const express = require('express');
const db = require('./db/models');
const inicializarModelos = require('./inicializarModelos');
const carreraRoute = require('./routes/carrera.route');
const materiaRoute = require('./routes/materia.route');
const cursoRoute = require('./routes/curso.route');
const profesorRoute = require('./routes/profesor.route');

const app = express();
const app_puerto = process.env.app_puerto || 3000;

app.use(express.json());
app.use(carreraRoute);
app.use(materiaRoute);
app.use(cursoRoute);
app.use(profesorRoute);

app.listen(app_puerto, async () => {
    console.log(`La app arrancó correctamente en el puerto ${app_puerto}.`);
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true });
        await inicializarModelos();
    } catch (err) {
        console.log(`No se pudo conectar a la base de datos: ${err}`);
    }
});