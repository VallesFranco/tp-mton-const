require('dotenv').config();

const express = require('express');
const db = require('./db/models');
const carreraRoute = require('./routes/carrera.route');

const app = express();
const app_puerto = process.env.app_puerto || 3000;

app.use(express.json());
app.use(carreraRoute);

app.listen(app_puerto, async () => {
    console.log(`La app arrancó correctamente en el puerto ${app_puerto}.`);
    try {
        await db.sequelize.authenticate();
        await db.sequelize.sync({ alter: true });
        const carreraCount = await db.Carrera.count();
        if (carreraCount === 0) {
            db.Carrera.create({
                nombre: "Tecnicatura en Programación",
                grado: "Pregrado",
                universidad: "UNAHUR"
            });
            db.Carrera.create({
              nombre: "Licenciatura en Informática",
              grado: "Grado",
              universidad: "UNAHUR"
            });
            db.Carrera.create({
              nombre: "Doctorado en Educación",
              grado: "Posgrado",
              universidad: "UNAHUR"
            });
        }  
    } catch (err) {
        console.log(`No se pudo conectar a la base de datos: ${err}`);
    }
});