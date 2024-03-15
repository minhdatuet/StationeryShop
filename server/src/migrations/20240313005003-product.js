'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      catalogId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'catalogs', key: 'id'}
      },
      productCost: {
        allowNull: false,
        type: Sequelize.DOUBLE
      },
      productImage: {
        allowNull: false,
        type: Sequelize.STRING
      },
      productQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      productDescription: {
        allowNull: false,
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
    await queryInterface.dropTable('Products');
  }
};