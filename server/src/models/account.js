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