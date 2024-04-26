'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        Product.hasMany(models.Products_In_Cart, {foreignKey: 'productId', sourceKey: 'id'}),
        Product.hasMany(models.Product_Rate, {foreignKey: 'productId', sourceKey: 'id'}),
        Product.hasMany(models.Products_Bought_History, {foreignKey: 'productId', sourceKey: 'id'}),
        Product.belongsTo(models.Catalog, {foreignKey: 'catalogId'}),
        Product.belongsTo(models.Product_In_Order, {foreignKey: 'productId', sourceKey: 'id'})
    }
  }
  Product.init({
    productName: DataTypes.STRING,
    catalogId: DataTypes.INTEGER,
    productCost: DataTypes.DOUBLE,
    productImage: DataTypes.STRING,
    productQuantity: DataTypes.INTEGER,
    productDescription: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};