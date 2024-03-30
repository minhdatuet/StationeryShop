const db = require('../models/');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize');

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
            where: {id}
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