'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      accountName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountPhone: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountPassword: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountType: {
        allowNull: false,
        type: Sequelize.ENUM(['ADMIN', 'CUSTOMER' ])
      },
      accountAddress: {
        allowNull: false,
        type: Sequelize.STRING
      },
      accountEmail: {
        allowNull: true,
        type: Sequelize.STRING
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};