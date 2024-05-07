const express = require('express');
const orderController = require('../controllers/orderController.js');

const router = express.Router();

router.get('/getConfirmingOrderById/:id', orderController.getConfirmingOrderById);
router.get('/getPendingOrderById/:id', orderController.getPendingOrderById);
router.get('/getCompletedOrderById/:id', orderController.getCompletedOrderById);
router.get('/getProductsInOrder/:oId', orderController.getProductsInOrderByOId);

router.get('/get/get-order-info-for-admin', orderController.getOrderInfoForAdmin);
router.put('/update/confirm-order/:id', orderController.confirmOrder);

module.exports = router;
