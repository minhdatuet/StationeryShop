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

exports.getAllProducts = () => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.findAll({
            include: {
                model: db.Catalog,
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
            where: {
            accountId: body.accountId,
            productId: body.productId,},
            defaults: {
                accountId: body.accountId,
                productId: body.productId,
                productsInCartQuantity: body.productsInCartQuantity
            }
        })
        console.log("1");
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
                where: { id: db.Sequelize.col('Products_In_Cart.productId') }
            }
        })
        resolve({
            err: response ? 0 : 2,
            msg: response ? 'Get products in cart is successfully' : 'Get products in cart is unsuccessfully',
            response
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

exports.createNewProduct = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product.create({
            productName: body.productName,
            productCost: body.productCost,
            productImage: body.productImage,
            productQuantity: body.productQuantity,
            productDescription: body.productDescription,
            catalogId: body.catalogId
        })
        resolve(response);
    } catch (error) {
        reject(error)
    }
});

exports.editProduct = (id, data) => new Promise(async (resolve, reject) => {
    try {
        const [rowsAffected] = await db.Product.update(data, {
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

  exports.getFeedbackByPIOId = (pIOId) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product_Rate.findOne({
            where: {
                productInOrder: pIOId,
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
});

exports.editFeedback = (data) => new Promise(async (resolve, reject) => {
    try {
        // const [rowsAffected] = await db.Product.update(data, {
        //     where: { 
        //         productInOrderId: data
        //     }
        // });

        // console.log(data);
        const response = await db.Product_Rate.update(
            {
            rateScore: data.numStar,
            productFeedback: data.comment,
            }, 
            {
                where: {
                    productInOrder: data.pIOId
                }
            }
        )
  
        resolve(response);
    } catch (error) {
        reject(error);
    }
  });

exports.createNewFeedback = (data) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Product_Rate.create({
            productId: data.pId,
            accountId : data.accId,
            productInOrder : data.pIOId,
            rateScore: data.numStar,
            productFeedback: data.comment,
        })
        resolve(response);
    } catch (error) {
        reject(error)
    }
});
