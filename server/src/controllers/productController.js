const productService = require('../services/productServices');

exports.getProductInfoByCatalogId = async (req, res) => {
    try {
        const response = await productService.getProductInfoByCatalogId(req.params.id);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at product controller getProductInfoByCatalogId " + error
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
            msg: 'Fail at product controller getBackpackInfo ' + error
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
            msg: 'Fail at product controller getBookInfo ' + error
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
            msg: 'Fail at product controller getCasioInfo ' + error
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
            msg: 'Fail at product controller getDesklampInfo ' + error
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
            msg: 'Fail at product controller getNotebookInfo ' + error
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
            msg: 'Fail at product controller getPenInfo ' + error
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
            msg: 'Fail at product controller getSchoolSupplyInfo ' + error
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
            msg: 'Fail at product controller getStationerySupplyInfo ' + error
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
            msg: 'Fail at product controller getStoryBookInfo ' + error
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
            msg: 'Fail at product controller getTableAndChairInfo ' + error
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
            msg: 'Fail at product controller getProductById ' + error
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
            msg: 'Fail at product controller addToCart ' + error
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
            msg: 'Fail at product controller getProductsInCart ' + error
        })
    }
}

exports.getProductsDetailInfoByCatalogId = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService.getProductsDetailInfoByCatalogId(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller getProductsDetailInfoByCatalogId ' + error
        })
    }
}

exports.getProductByCatalogIdForAdmin = async (req, res) => {
    try {
        const id = req.params.id
        const response = await productService.getProductByCatalogIdForAdmin(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at product controller get product by catalog id for admin ' + error
        })
    }
}

exports.adminDeleteProductById = async (req, res) => {
    try {
        const response = await productService.adminDeleteProductById(req.params.id);
        return res.status(200).json(response);
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: "Fail at user controller admin delete product by id " + error
        })
    }
}

exports.createNewProduct = async (req, res) => {
    const {productName, productImage, productQuantity, productCost, productDescription, catalogId} = req.body
    try {
        if (!productName || !productImage || !productQuantity || !productCost || !productDescription || !catalogId) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs!' + (!productName ? "productName " : " ") + (!productImage ? "productImage " : " ") + (!productQuantity ? "productQuantity " : " ") + (!productCost ? "productCost " : " ") + (!productDescription ? "productDesctiption " : " ") + (!catalogId ? "catalogId " : " ")
            })   
        }
        const response = await productService.createNewProduct(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller create new product ' + error
        })
    }
}

exports.editProduct = async (req, res) => {
    
    try{
        const id = req.params.id
        const response = await productService.editProduct(id, req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller edit product ' + error
        })
    }
}
