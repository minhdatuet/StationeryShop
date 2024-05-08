'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductInOrder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Order.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' }),
      ProductInOrder.belongsTo(models.Order, {foreignKey: 'orderId'}),
      ProductInOrder.hasOne(models.Product, { foreignKey: 'id', sourceKey: 'productId'}),
      ProductInOrder.hasOne(models.Products_Bought_History, {foreignKey: 'productInOrderId', sourceKey: 'id'})
    }
  }
  ProductInOrder.init({
    orderId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Product_In_Order',
  });
  return ProductInOrder;
};