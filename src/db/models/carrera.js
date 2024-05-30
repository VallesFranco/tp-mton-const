'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carrera extends Model {
    static associate(models) {
      
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
    modelName: 'Carrera',
    timestamps: false,
  });
  return Carrera;
};