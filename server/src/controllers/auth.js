const authService = require('../services/auth.js');
exports.login = async (req, res) => {
    const {accountPhone, accountPassword} = req.body
    try{
        if(!accountPhone || !accountPassword) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' 
        })
        const response = await authService.loginService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller login ' + error
        })
    }
}

exports.createAccount = async (req, res) => {
    const {accountName, accountPhone, accountPassword, accountAddress, accountType} = req.body
    try{
        // return accountName
        if(!accountName || !accountPhone || !accountPassword || !accountAddress || !accountType) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountName ? "accountName " : " ") + (!accountPhone ? "accountPhone " : " ") 
                                + (!accountPassword ? "accountPassword " : " ") + (!accountAddress ? "accountAddress " : " ")
                                + (!accountType ? "accountType " : " ")
        })
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller createAccount ' + error
        })
    }
}
