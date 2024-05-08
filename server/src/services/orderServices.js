const db = require('../models/');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes, Op, where } = require('sequelize');
const product = require('../models/order');

exports.getConfirmingOrderById = (id) => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Order.findAll({
            where: {
                accountId: id,
                status: "WAITING"
            }
        })
        resolve({
            msg: response ? "Success" : "Unsuccess",
            response
        })
    }
    catch (err) {
        reject(err);
    }
});

exports.getPendingOrderById = (id) => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Order.findAll({
            where: {
                accountId: id,
                status: "WAITING"
            }
        })
        resolve({
            msg: response ? "Success" : "Unsuccess",
            response
        })
    }
    catch (err) {
        reject(err);
    }
});

exports.getCompletedOrderById = (id) => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Order.findAll({
            where: {
                accountId: id,
                status: "COMPLETED"
            }
        })
        resolve({
            msg: response ? "Success" : "Unsuccess",
            response
        })
    }
    catch (err) {
        reject(err);
    }
});

exports.getProductsInOrderByOId = (id) => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product_In_Order.findAll({
            include: [{
                model: db.Product,
            }],
            where: {
                orderId: id,
            }
        })
        resolve({
            msg: response ? "Success" : "Unsuccess",
            response
        })
    }
    catch (err) {
        reject(err);
    }
});

exports.getOrderInfoForAdmin = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Order.findAll({
            attributes: ['id', 'totalPrice', 'status'],
            include: [
                { model: db.Account, attributes: ['accountName', 'accountPhone', 'accountAddress'] },
                { 
                    model: db.Product_In_Order, 
                    include: [
                        { 
                            model: db.Product, 
                            attributes: ['productName'],
                            include: [
                                { model: db.Catalog, attributes: ['catalogName'] }
                            ]
                        }
                    ]
                }
            ]
        });
        resolve({
            msg: response ? "Success" : "Unsuccess",
            response
        })
    }
    catch (error) {
        reject(error);
    }
})

exports.confirmOrder = (id) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Order.update(
            {
                status: 'COMPLETED'
            }, 
            {
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
