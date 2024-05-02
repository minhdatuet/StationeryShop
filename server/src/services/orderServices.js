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