'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cursos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      comision: {
        type: Sequelize.STRING
      },
      turno: {
        type: Sequelize.STRING,
        allowNull: false
      },
      fechaInicio: {
        type: Sequelize.DATEONLY,
        allowNull: false
      },
      fechaFin: {
        type: Sequelize.DATEONLY,
        allowNull: false
      }
    });
    await queryInterface.addColumn('Cursos', 'materiaId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Materia',
        key: 'id'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cursos');
    await queryInterface.removeColumn('Cursos', 'materiaId');
  }
};