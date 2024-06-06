const express = require('express');
const stripeController = require('../controllers/stripeController');

const router = express.Router();

const stripe = require('../../stripe')

router.post('/post/make-payment', stripeController.makePayment);

module.exports = router;
