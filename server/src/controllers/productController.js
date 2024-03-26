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