const productService = require('../services/productServices');

exports.getProductInfoByCatalogId = async (req, res) => {
    try {
        const response = await productService.getProductInfoByCatalogId(req.params.id);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at product controller " + error
        })
    }
}

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
};

exports.getProductsDetailInfoByCatalogId = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService.getProductsDetailInfoByCatalogId(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller ' + error
        })
    }
};