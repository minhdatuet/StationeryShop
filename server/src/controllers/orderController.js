const orderService = require('../services/orderServices.js');

exports.getConfirmingOrderById = async (req, res) => {
    const data = req.params.id;
    // console.log(data);
    try{
        const response = await orderService.getConfirmingOrderById(data)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getConfirmingOrderById ' + error
        })
    }
};

exports.getPendingOrderById = async (req, res) => {
    const data = req.params.id;
    // console.log(data);
    try{
        const response = await orderService.getPendingOrderById(data)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getPendingOrderById ' + error
        })
    }
};

exports.getCompletedOrderById = async (req, res) => {
    const data = req.params.id;
    // console.log(data);
    try{
        const response = await orderService.getCompletedOrderById(data)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getCompletedOrderById ' + error
        })
    }
};

exports.getProductsInOrderByOId = async (req, res) => {
    const data = req.params.oId;
    // console.log(data);
    try{
        const response = await orderService.getProductsInOrderByOId(data)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getProductsInOrderByOId ' + error
        })
    }
};

exports.getBoughtHistoryByAId = async (req, res) => {
    const data = req.params.aId;
    // console.log(data);
    try{
        const response = await orderService.getBoughtHistoryByAId(data)
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getBoughtHistoryByAId ' + error
        })
    }
};

exports.getOrderInfoForAdmin = async (req, res) => {
    try{
        const response = await orderService.getOrderInfoForAdmin()
        return res.status(200).json(response)    
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getOrderInfoForAdmin ' + error
        })
    }
};

exports.confirmOrder = async (req, res) => {
    
    try{
        const id = req.params.id
        const response = await orderService.confirmOrder(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at user controller confirmOrder ' + error
        })
    }
}

exports.addToBoughtHistoryWhenConfirm = async (req, res) => {
    const { productInOrderId, isRated, purchaseTime } = req.body
    try {
        if (!productInOrderId || isRated === 1 || !purchaseTime) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs!' + (!productInOrderId ? "productInOrderId " : " ") + (!isRated ? "isRated " : " ") + (!purchaseTime ? "purchaseTime " : " ")
            })   
        }
        const response = await orderService.addToBoughtHistoryWhenConfirm(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at order controller addToBoughtHistoryWhenConfirm ' + error
        })
    }
}

exports.getStatisticGroupByCategory = async (req, res) => {
    try {
        const response = await orderService.getStatisticGroupByCategory()
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getStatisticQuantityGroupByCategory ' + error
        })
    }
};

exports.getDetailByPIOID = async (req, res) => {
    try {
        const data = req.params.pIOId;
        // console.log(data);
        const response = await orderService.getDetailByPIOID(data)
        return res.status(200).json(response)
    }
    catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at auth controller getDetailByPIOID ' + error
        })
    }
};

exports.handleWhenCustomerClickPayNow = async (req, res) => {
    const { accountId, status, totalPrice } = req.body
    try {
        if (!accountId || !status || !totalPrice) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs!' + (!accountId ? "accountId " : " ") + (!status ? "status " : " ") + (!totalPrice ? "totalPrice " : " ")
            })   
        }
        const response = await orderService.handleWhenCustomerClickPayNow(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at order controller handleWhenCustomerClickPayNow ' + error
        })
    }
}

exports.addToProductInOrderWhenPaySuccess = async (req, res) => {
    const { orderId, productId, quantity } = req.body
    try {
        if (!orderId || !productId || !quantity) {
            return res.status(400).json({
                err: 1,
                msg: 'Missing inputs!' + (!orderId ? "orderId " : " ") + (!productId ? "productId " : " ") + (!quantity ? "quantity " : " ")
            })   
        }
        const response = await orderService.addToProductInOrderWhenPaySuccess(req.body)
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Fail at order controller addToProductInOrderWhenPaySuccess ' + error
        })
    }
}
