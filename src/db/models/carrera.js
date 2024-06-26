'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {
    static associate(models) {
      Carrera.hasMany(models.Materia, {
        as: 'materias',
        foreignKey: {
          name: 'carreraId',
          allowNull: false
        }
      })
    }
  }
  Carrera.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      grado: {
        type: DataTypes.STRING,
        allowNull: false
      },
      universidad: {
        type: DataTypes.STRING,
        allowNull: false
      }
  }, {
    sequelize,
    name: {
      singular: 'Carrera',
      plural: 'Carreras'
    },
    timestamps: false
  });
  return Carrera;
};