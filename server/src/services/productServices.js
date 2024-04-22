const db = require('../models/');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes, Op, where } = require('sequelize');
const product = require('../models/product');

exports.getProductInfoByCatalogId = (id) => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: id
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
})

exports.getBackpackInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 1
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getBookInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 2
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getCasioInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 3
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getDesklampInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 4
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getNotebookInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 5
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getPenInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 6
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getSchoolSupplyInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 7
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getStationerySupplyInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 8
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getStoryBookInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 9
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})

exports.getTableAndChairInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Product.findAll({
            where: {
                catalogId: 10
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    }
    catch (err) {
        reject(err);
    }
})


exports.getProductById = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.findOne({
            where: {id},
            include: {
                model: db.Product_Rate,
                include: {
                    model: db.Account
                }
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get product by id is successfully' : 'Get product by id  is unsuccessfully',
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.addToCart = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Products_In_Cart.findOrCreate({
            where: {productId: body.productId,
            accountId: body.accountId},
            defaults: {
                accountId: body.accountId,
                productId: body.productId,
                productsInCartQuantity: body.productsInCartQuantity
            }
        })
        if (!response[1]) {
            const quantity = parseInt(response[0].productsInCartQuantity) + parseInt(body.productsInCartQuantity)
            if (quantity > 0) {
                response[0].productsInCartQuantity = quantity
                await response[0].save({ fields: ['productsInCartQuantity'] });
            } else {
                await db.Products_In_Cart.destroy({
                    where: {productId: body.productId},
                })
            }
            
            
        }
        resolve({
            err: response? 0 : 2,
            msg: response? 'Add to cart is successfully!' : 'You must login first',
        })
    } catch (error) {
        reject(error)
    }
})

exports.getProductsInCart = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Products_In_Cart.findAll({
            where: {accountId: id},
            include: {
                model: db.Product,
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get products in cart is successfully' : 'Get products in cart is unsuccessfully',
        })
    }
    catch (error) {
        reject(error);
    }
});

exports.getProductsDetailInfoByCatalogId = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            
            include: {
                model: db.Product_Rate,
                attributes: [
                    [Sequelize.fn('AVG', Sequelize.col('product_rates.rateScore')), 'avgScore'],
                    [Sequelize.fn('COUNT', Sequelize.col('product_rates.productId')), 'productRvs'],
                ],
            },
            where: {
                catalogId: id,
            }, 
            group: ["id"]
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        })
    } catch (error) {
        reject(error)
    }
})

exports.getProductByCatalogIdForAdmin = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            where: { catalogId: id },
            include: {
                model: db.Catalog
            }
        })
        resolve({
            msg: response ? "Successfully" : "Unsuccessfully",
            response
        });
    }
    catch (error) {
        reject(error);
    }
})

exports.adminDeleteProductById = (id) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.destroy({
            where: {
                id: id
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? "Admin Delete Product By ID Successfully" : "ADmin Delete Product By ID Failure"
        })
    }
    catch (error) {
        reject(error);
    }
})
