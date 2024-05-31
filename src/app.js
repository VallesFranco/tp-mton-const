require('dotenv').config();

const express = require('express');
const db = require('./db/models');
const carreraRoute = require('./routes/carrera.route');
const materiaRoute = require('./routes/materia.route');
const cursoRoute = require('./routes/curso.route');

const app = express();
const app_puerto = process.env.app_puerto || 3000;

app.use(express.json());
app.use(carreraRoute);
app.use(materiaRoute);
app.use(cursoRoute);

app.listen(app_puerto, async () => {
    console.log(`La app arrancó correctamente en el puerto ${app_puerto}.`);
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ force: true });
        const carreraCount = await db.Carrera.count();
        if (carreraCount === 0) {
            await db.Carrera.create({
                nombre: "Tecnicatura en Programación",
                grado: "Pregrado",
                universidad: "UNAHUR",
                materias: [
                    {
                        nombre: "Introducción a lógica",
                        cuatrimestral: 1,
                        anio: 1
                    },
                    {
                        nombre: "Organización de computadoras 1",
                        cuatrimestral: 1,
                        anio: 1
                    }
                ]
            }, { include:['materias'] });
            await db.Carrera.create({
                nombre: "Licenciatura en Informática",
                grado: "Grado",
                universidad: "UNAHUR"
            });
            await db.Carrera.create({
                nombre: "Doctorado en Educación",
                grado: "Posgrado",
                universidad: "UNAHUR"
            });
        }
    } catch (err) {
        console.log(`No se pudo conectar a la base de datos: ${err}`);
    }
});