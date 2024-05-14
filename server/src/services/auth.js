const db = require('../models/');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))
const { Sequelize, DataTypes, Op } = require('sequelize');

exports.registerService = (body) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Account.findOrCreate({
            where: {
                [Op.or]: [
                    { accountPhone: body.accountPhone },
                    { accountEmail: body.accountEmail }
                ]
            },
            defaults: {
                accountName: body.accountName,
                accountPhone: body.accountPhone,
                accountEmail: body.accountEmail,
                accountPassword: hashPassword(body.accountPassword),
                accountType: body.accountType,
                accountAddress: body.accountAddress
            }
        });

        if (response[1]) {
            // Nếu tài khoản được tạo mới thành công
            const token = jwt.sign({ accountPhone: response[0].accountPhone }, process.env.SECRET_KEY, { expiresIn: '2d' });
            resolve({
                err: 0,
                msg: 'Register is successful!',
                token: token
            });
        } else {
            // Nếu số điện thoại hoặc email đã tồn tại
            let errMsg = '';
            if (response[0].accountPhone === body.accountPhone) {
                errMsg = 'Phone number already exists!';
            } else if (response[0].accountEmail === body.accountEmail) {
                errMsg = 'Email already exists!';
            }
            resolve({
                err: 2,
                msg: errMsg,
                token: null
            });
        }
    } catch (error) {
        reject(error);
    }
});


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

