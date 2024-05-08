'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsBoughtHistory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ProductsBoughtHistory.belongsTo(models.Product_In_Order, {foreignKey: 'productInOrderId'})
    }
  }
  ProductsBoughtHistory.init({
    productInOrderId: DataTypes.INTEGER,
    isRated: DataTypes.INTEGER,
    purchaseTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Products_Bought_History',
  });
  return ProductsBoughtHistory;
};