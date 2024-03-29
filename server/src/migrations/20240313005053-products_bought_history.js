'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Products_Bought_Historys', {
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
      productsBoughtQuantity: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      purchaseTime: {
        allowNull: false,
        type: Sequelize.DATE
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
    await queryInterface.dropTable('Products_Bought_Historys');
  }
};