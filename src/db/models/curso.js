'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Curso extends Model {
    static associate(models) {
      Curso.belongsTo(models.Materia, {
        as: 'materia',
        foreignKey: {
          name: 'materiaId',
          allowNull: false
        }
      })
      Curso.belongsToMany(models.Profesor, {
        through: {
          model: 'Curso_Profesor',
          attributes: []
        },  
        as: 'profesores',
        foreignKey: {
          name: 'cursoId',
          allowNull: false
        }  
      });
    }
  }
  Curso.init({
    comision: DataTypes.STRING,  
    turno: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    fechaInicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },  
    fechaFin: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }  
  }, {
    sequelize,
    name: {
      singular: 'Curso',
      plural: 'Cursos'
    },
    timestamps: false
  });
  return Curso;
};