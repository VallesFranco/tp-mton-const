'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profesor extends Model {
    static associate(models) {
      Profesor.belongsToMany(models.Curso, {
        through: {
          model: 'Curso_Profesor',
          attributes: []
        },
        as: 'cursos',
        foreignKey: {
          name: 'profesorId',
          allowNull: false
        }  
      });
    }
  }
  Profesor.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },  
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },  
    legajo: {
      type: DataTypes.NUMBER
    },  
    activo: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }  
  }, {
    sequelize,
    name: {
      singular: 'Profesor',
      plural: 'Profesores'
    },
    timestamps: false
  });
  return Profesor;
};