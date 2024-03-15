'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Product_Rates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'products', key: 'id'}
      },
      accountId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: 'accounts', key: 'id'}
      },
      rateScore: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      productFeedback: {
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
    await queryInterface.dropTable('Product_Rates');
  }
};