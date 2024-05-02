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
            msg: 'Fail at auth controller' + error
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
            msg: 'Fail at auth controller' + error
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
            msg: 'Fail at auth controller' + error
        })
    }
};