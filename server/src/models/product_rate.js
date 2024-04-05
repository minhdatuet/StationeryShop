'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductRate extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
        ProductRate.belongsTo(models.Product, {foreignKey: 'productId'}),
        ProductRate.belongsTo(models.Account, {foreignKey: 'accountId'})
    }
  }
  ProductRate.init({
    accountId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    rateScore: DataTypes.INTEGER,
    productFeedback: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product_Rate',
  });
  return ProductRate;
};