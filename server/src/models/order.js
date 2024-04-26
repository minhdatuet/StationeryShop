'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
    //   Order.belongsTo(models.Product, { foreignKey: 'productId', onDelete: 'CASCADE' }),
      Order.belongsTo(models.Account, {foreignKey: 'accountId'}),
      Order.hasMany(models.Product_In_Order, { foreignKey: 'orderId', sourceKey: 'id' })
    }
  }
  Order.init({
    accountId: DataTypes.INTEGER,
    status: DataTypes.ENUM(['WAITING', 'COMPLETED']),
    totalPrice: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};