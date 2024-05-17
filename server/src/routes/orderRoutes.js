const express = require('express');
const orderController = require('../controllers/orderController.js');

const router = express.Router();

router.get('/getConfirmingOrderById/:id', orderController.getConfirmingOrderById);
router.get('/getPendingOrderById/:id', orderController.getPendingOrderById);
router.get('/getCompletedOrderById/:id', orderController.getCompletedOrderById);
router.get('/getProductsInOrder/:oId', orderController.getProductsInOrderByOId);
router.get('/getBoughtHistoryById/:aId', orderController.getBoughtHistoryByAId)

router.get('/get/get-order-info-for-admin', orderController.getOrderInfoForAdmin);
router.put('/update/confirm-order/:id', orderController.confirmOrder);
router.post('/post/add-to-bought-history-when-confirmed', orderController.addToBoughtHistoryWhenConfirm);
router.get('/get/get-statistic-data', orderController.getStatisticGroupByCategory);
router.get('/getDetailByPIOID/:pIOId', orderController.getDetailByPIOID);

module.exports = router;
