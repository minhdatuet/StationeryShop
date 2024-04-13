const userService = require('../services/user.js');
exports.getUser = async (req, res) => {
    const {accountPhone} = req.user
    try {
        if(!accountPhone) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountPhone ? "phone " : " ")
        })
        const response = await userService.getUser(accountPhone)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller' + error
        })
    }
}

exports.getAll = async (req, res) => {
    try {
        const response = await userService.getAllService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.updateById = async (req, res) => {
    
    try{
        const id = req.params.id
        const response = await userService.updateService(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.deleteById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await userService.deleteService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller' + error
        })
    }
}

exports.getAllCustomerInfo = async (req, res) => {
    try {
        const response = await userService.getAllCustomerInfo()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller get all customer info ' + error
        })
    }
}

exports.deleteCustomerAccountById = async (req, res) => {
    try {
        const response = await userService.deleteCustomerAccountById(req.params.id);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at user controller delete customer account by id " + error
        })
    }
}

exports.modifyCustomerAccount = async (req, res) => {
    
    try{
        const id = req.params.id
        const response = await userService.modifyCustomerAccount(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller modify customer account ' + error
        })
    }
}

exports.getAccountByPhone = async (req, res) => {
    try {
        const phone = req.params.phone
        const response = await userService.getAccountByPhone(phone);
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller get account by phone ' + error
        })
    }
}

exports.createAccountForAnotherAdmin = async (req, res) => {
    const {accountName, accountPhone, accountPassword, accountEmail, accountType} = req.body
    try {
        if (!accountName || !accountPhone || !accountPassword || !accountEmail || !accountType) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs!' + (!accountName ? "accountName " : " ") + (!accountPhone ? "accountPhone " : " ") + (!accountPassword ? "accountPassword " : " ") + (!accountEmail ? "accountEmail " : " ") + (!accountType ? "accountType " : " ")
            })   
        }
        const response = await userService.createAccountForAnotherAdmin(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller create account for another admin ' + error
        })
    }
}
