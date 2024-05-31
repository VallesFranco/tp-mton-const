'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Materia extends Model {
    static associate(models) {
      Materia.belongsTo(models.Carrera, {
        as: 'Carrera',
        foreignKey: {
          name: 'carreraId',
          allowNull: false
        }
      })  
    }
  }
  Materia.init({
      nombre: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cuatrimestral: {
        type: DataTypes.BOOLEAN,
        allowNull: false
      },
      anio: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
  }, {
    sequelize,
    name: {
      singular: 'Materia',
      plural: 'Materias'
    },
    timestamps: false
  });
  return Materia;
};