const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwr = require('jsonwebtoken');
require('dotenv').config()
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))
const { Sequelize, DataTypes, Op } = require('sequelize');

exports.registerService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            where: {accountPhone: body.accountPhone},
            defaults: {
                accountName: body.accountName,
                accountPhone: body.accountPhone,
                accountPassword: hashPassword(body.accountPassword),
                accountType: body.accountType,
                accountAddress: body.accountAddress
            }
        })
        
        const token = response[1] && jwr.sign({accountPhone: response[0].accountPhone}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token? 0 : 2,
            msg: token ? 'Register is successfully!' : 'Phone number has already exist!',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})


exports.loginService = (body) => new Promise(async(resolve, reject) => {
    try {
        const response = await db.Account.findOne({
            where: {accountPhone: body.accountPhone},
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(body.accountPassword, response.accountPassword)
        const token = isCorrectPassword && jwr.sign({accountPhone: response.accountPhone}, process.env.SECRET_KEY, {expiresIn: '2d'})
        resolve({
            err: token? 0 : 2,
            msg: token ? 'Login is succesfully!' : response ? 'Password is incorrect' : `Phone number hasn't been registed`,
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})

