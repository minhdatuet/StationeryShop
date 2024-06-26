const express = require('express');
const payosController = require('../controllers/payosController');

const router = express.Router();

router.post('/post/create-payment-link', payosController.createPaymentLink)

router.get('/get/get-payment-link-infomation/:orderId', payosController.getPaymentLinkInfomation)

router.put('/put/cancel-payment-link/:orderId', payosController.cancelPaymentLink)

router.post('/post/confirm-web-hook/web-hook', payosController.confirmWebHook)

router.get('/get/verify-payment-web-hook-data/:payload', payosController.verifyPaymentWebhookData)

module.exports = router;
