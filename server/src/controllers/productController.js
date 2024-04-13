const productService = require('../services/productServices');

exports.getBackpackInfo = async (req, res) => {
    try {
        const response = await productService.getBackpackInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getBookInfo = async (req, res) => {
    try {
        const response = await productService.getBookInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getCasioInfo = async (req, res) => {
    try {
        const response = await productService.getCasioInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getDesklampInfo = async (req, res) => {
    try {
        const response = await productService.getDesklampInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getNotebookInfo = async (req, res) => {
    try {
        const response = await productService.getNotebookInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getPenInfo = async (req, res) => {
    try {
        const response = await productService.getPenInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getSchoolSupplyInfo = async (req, res) => {
    try {
        const response = await productService.getSchoolSupplyInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getStationerySupplyInfo = async (req, res) => {
    try {
        const response = await productService.getStationerySupplyInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getStoryBookInfo = async (req, res) => {
    try {
        const response = await productService.getStoryBookInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getTableAndChairInfo = async (req, res) => {
    try {
        const response = await productService.getTableAndChairInfo();
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}


exports.getProductById = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService.getProductById(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.addToCart = async (req, res) => {
    const {accountId, productId, productsInCartQuantity} = req.body
    try{
        // return accountName
        if(!accountId || !productId || !productsInCartQuantity) return res.status(400).json({
            err: 1,
            msg: 'Missing inputs!' + (!accountId ? "accountId " : " ") + (!productId ? "productId " : " ") 
        })
        const response = await productService.addToCart(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}

exports.getProductsInCart = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService.getProductsInCart(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller' + error
        })
    }
}