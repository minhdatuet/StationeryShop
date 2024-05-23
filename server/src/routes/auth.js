const express = require('express');
const authController = require('../controllers/auth.js');

const router = express.Router();

router.post('/create', authController.createAccount);
router.post('/login', authController.login);
router.post('/google-login', authController.googleLogin);
router.post('/complete-profile', authController.completeProfile);
module.exports = router;
