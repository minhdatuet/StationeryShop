const db = require('../models/');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes, Op, where } = require('sequelize');
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

exports.getUser = (accountPhone) => new Promise(async(resolve, reject) => {
    try {
        let response  = await db.Account.findOne({
            where: {
              accountPhone
            },
            // raw: true,
            attributes: ['id','accountName', 'accountPhone', 'accountAddress', 'accountEmail'],
            include: [
            {
                model: db.Products_In_Cart,
                attributes: ['id','accountId', 'productId'],
                required: false,
            },
            {
                model: db.Products_Bought_History,
                attributes: ['id','accountId', 'productId'],
                required: false,
            }]

        })
        
        resolve({
            err: response? 0: 2,
            msg: response? "Succesfully" : "Unsuccesfully",
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.getAllService = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Accounts.findAll({
            // raw: true,
            attributes: ['id','name', 'phone', 'address', 'accountType'],
            include: [
            {
                model: db.Warehouse,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.TransactionPoint,
                attributes: ['id','name', 'address'],
                required: false,
            },
            {
                model: db.Employee,
                required: false,
                attributes: ['id'],
                include: [{
                    model: db.Warehouse,
                    attributes: ['id','name', 'address']
                },
                {
                    model: db.TransactionPoint,
                    attributes: ['id','name', 'address'],
                    include: [{
                        model: db.Warehouse,
                        attributes: ['id','name', 'address']
                    }]
                }]
            }]
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get all users is successfully' : 'Get all users is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})
  
  exports.updateService = (id, updatedData) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Accounts.update(updatedData, {
            where: { id }
        });
        const successMessage = 'Update is successful';
        const errorMessage = 'Update is failed';
        const response = {
            err: rowsAffected> 0 ? 0 : 2,
            msg: rowsAffected> 0 ? successMessage : errorMessage,
        };
  
        resolve(response);
    } catch (error) {
        reject(error);
    }
  });

exports.deleteService = (id) => new Promise(async(resolve, reject) => {
    try {

      const responseEmployee = await db.Employee.destroy({
        where: {accountId: id}
      })
       const response = await db.Accounts.destroy({
            where: {id,
            [Op.or]: [{
                accountType: 'WAREHOUSE_STAFF'
            },{
                accountType: 'POINT_STAFF'
            }]}
        })
        resolve({
          err: responseEmployee && response ? 0 : 2,
          msg: responseEmployee && response ? 'Delete is successfully' : `Can't find this id`,
        })
  
      } catch (error) {
        reject(error)
    }
  })

  exports.getAllCustomerInfo = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findAll({
            where: {
                accountType: 'CUSTOMER'
            }
        })
        resolve({
            err: response? 0 : 2,
            msg: response? "Succesfully" : "Unsuccesfully",
            response
        })
    }
    catch (error) {
        reject(error);
    }

  });

  exports.getDetailInfoByID = (uId) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            where: {
                id: uId
            }
        })
        resolve({
            err: response? 0 : 2,
            msg: response? "Succesfully" : "Unsuccesfully",
            response
        })
  } catch (error) {
    reject(error);
}

});


  exports.deleteCustomerAccountById = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.destroy({
            where: {
                id: id
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? "Delete Account By ID Successfully" : "Delete Account By ID Failure"

        })
    }
    catch (error) {
        reject(error);
    }

  });
  



  exports.modifyCustomerAccount = (id, data) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Account.update(data, {
            where: { 
                id: id 
            }
        });
        const successMessage = 'Update is successful';
        const errorMessage = 'Update is failed';
        const response = {
            err: rowsAffected > 0 ? 0 : 2,
            msg: rowsAffected > 0 ? successMessage : errorMessage,
        };
  
        resolve(response);
    } catch (error) {
        reject(error);
    }
  });

  exports.getAccountByPhone = (phone) => new Promise(async (resolve, reject) => {
    try {
        const quantityAccount = await db.Account.count({
            where:  {
                accountPhone: phone
            }
        });

        const duplicateMessage = "Your phone is duplicate";
        const notDuplicateMessage = "Your phone is not duplicate";
        const response = {
            err: quantityAccount > 0 ? 0 : 2,
            msg: quantityAccount > 0 ? duplicateMessage : notDuplicateMessage,
        };
        resolve(response);
    }
     catch (error) {
        reject(error);
     }
  });

  exports.createAccountForAnotherAdmin = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.create({
            accountName: body.accountName,
            accountPassword: hashPassword(body.accountPassword),
            accountPhone: body.accountPhone,
            accountEmail: body.accountEmail,
            accountType: body.accountType
        })

        resolve(response);
    } catch (error) {
        reject(error)
    }
});

