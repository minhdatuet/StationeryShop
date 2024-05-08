'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Account.hasMany(models.Products_In_Cart, {foreignKey: 'accountId', sourceKey: 'id'}),
      Account.hasMany(models.Product_Rate, {foreignKey: 'accountId', sourceKey: 'id'}),
      Account.hasMany(models.Order, {foreignKey: 'accountId', sourceKey: 'id'})
    }
  }
  Account.init({
    accountName: DataTypes.STRING,
    accountPhone: DataTypes.STRING,
    accountPassword: DataTypes.STRING,
    accountType: DataTypes.ENUM(['ADMIN', 'CUSTOMER' ]),
    accountAddress: DataTypes.STRING,
    accountEmail: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Account',
  });
  return Account;
};