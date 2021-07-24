'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      lastName2: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      Password: {
        type: Sequelize.STRING
      },
      Password2: {
        type: Sequelize.STRING
      },
      Photo: {
        type: Sequelize.BLOB
      },
      profile: {
        type: Sequelize.STRING
      },
      specialization: {
        type: Sequelize.STRING
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};