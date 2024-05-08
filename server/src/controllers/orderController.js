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
