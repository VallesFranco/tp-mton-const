const db = require('./db/models');

async function inicializarModelos() {
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
                    anio: 1,
                    cursos: [
                        {
                            comision: "A1",
                            turno: "Mañana",
                            fechaInicio: "2015-03-20",
                            fechaFin: "2015-07-20" 
                        }
                    ]
                },
                {
                    nombre: "Organización de computadoras 1",
                    cuatrimestral: 1,
                    anio: 1,
                    cursos: [
                        {
                            comision: "A2",
                            turno: "Mañana",
                            fechaInicio: "2015-03-20",
                            fechaFin: "2015-07-20" 
                        },
                        {
                            comision: "A3",
                            turno: "Tarde",
                            fechaInicio: "2015-03-20",
                            fechaFin: "2015-07-20" 
                        }
                    ]
                }, 
            ]
        }, { include: [{ model: db.Materia, as: 'materias', include: { model: db.Curso, as: 'cursos' } }] });
        await db.Carrera.create({
            nombre: "Licenciatura en Informática",
            grado: "Grado",
            universidad: "UNAHUR",
            materias: [
                {
                    nombre: "Programación con objetos 3",
                    cuatrimestral: 1,
                    anio: 1,
                    cursos: []
                }
            ]
        }, { include: [{ model: db.Materia, as: 'materias', include: { model: db.Curso, as: 'cursos' } }] });
        await db.Carrera.create({
            nombre: "Doctorado en Educación",
            grado: "Posgrado",
            universidad: "UNAHUR"
        });
        await db.Profesor.create({
            nombre: "Franco",
            fechaNacimiento: "2000-03-20",
            legajo: 42000888,
            activo: 1
        });
        await db.Profesor.create({
            nombre: "David",
            fechaNacimiento: "2000-05-20",
            legajo: 42100888,
            activo: 0
        });
    }
}

module.exports = inicializarModelos;