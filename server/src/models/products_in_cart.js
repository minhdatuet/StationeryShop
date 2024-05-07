'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductsInCart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductsInCart.belongsTo(models.Product, {foreignKey: 'id'}),
      ProductsInCart.belongsTo(models.Account, {foreignKey: 'accountId'})
    }
  }
  ProductsInCart.init({
    productId: DataTypes.INTEGER,
    accountId: DataTypes.INTEGER,
    productsInCartQuantity: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Products_In_Cart',
  });
  return ProductsInCart;
};