const express = require('express');
const stripeController = require('../controllers/stripeController');

const router = express.Router();

const stripe = require('../../stripe')

router.post('/post/make-payment', stripeController.makePayment);
router.post('/post/create-check-out-session', stripeController.createCheckOutSession);
router.get('/get/retrieve-a-session/:id', stripeController.retrieveASession);

module.exports = router;
