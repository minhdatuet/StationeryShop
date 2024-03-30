const express = require('express');
const verifyToken = require('../middleware/verifytoken.js');
const productController = require('../controllers/productController.js')

const router = express.Router();

router.get('/get/get-product-info-by-catalog/:id', productController.getProductInfoByCatalogId);
router.get('/get/get-all-backpack-info', productController.getBackpackInfo);
router.get('/get/get-all-book-info', productController.getBookInfo);
router.get('/get/get-all-casio-info', productController.getCasioInfo);
router.get('/get/get-all-desklamp-info', productController.getDesklampInfo);
router.get('/get/get-all-notebook-info', productController.getNotebookInfo);
router.get('/get/get-all-pen-info', productController.getPenInfo);
router.get('/get/get-all-school-supply-info', productController.getSchoolSupplyInfo);
router.get('/get/get-all-stationery-supply-info', productController.getStationerySupplyInfo);
router.get('/get/get-all-story-book-info', productController.getStoryBookInfo);
router.get('/get/get-all-table-and-chair-info', productController.getTableAndChairInfo);

module.exports = router;
