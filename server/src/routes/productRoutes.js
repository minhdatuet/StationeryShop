const express = require('express');
const verifyToken = require('../middleware/verifytoken.js');
const productController = require('../controllers/productController.js')

const router = express.Router();

router.use(verifyToken);
router.get('/get/get-all-backpack-info', productController.getBackpackInfo);

module.exports = router;
