'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Materia', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cuatrimestral: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      anio: {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    });
    await queryInterface.addColumn('Materia', 'carreraId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Carreras',
        key: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Materia');
    await queryInterface.removeColumn('Materia', 'carreraId');
  }
};