const db = require('../models/');
const bcrypt = require('bcryptjs');
const { response } = require('express');
const jwr = require('jsonwebtoken');
require('dotenv').config();
const { Sequelize, DataTypes, Op } = require('sequelize');

exports.getBackpackInfo = () => new Promise(async(resolve, reject) => {
    try {
        let response = await db.Products.findAll({
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