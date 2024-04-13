const express = require('express');
const userController = require('../controllers/user.js');
const verifyToken = require('../middleware/verifytoken.js');

const router = express.Router();

// router.use(verifyToken)
router.get('/get/get-all-customer-info', userController.getAllCustomerInfo);
router.delete('/delete-customer-account/:id',userController.deleteCustomerAccountById);
router.put('/modify-customer-account/:id', userController.modifyCustomerAccount);
router.get('/get/user', userController.getUser);
router.put('/update/:id', userController.updateById);
router.get('/get/all', userController.getAll);
router.delete('/delete/:id',userController.deleteById);
router.get('/get/get-account-by-phone/:phone', userController.getAccountByPhone);
router.post('/post/create-account-for-another-admin', userController.createAccountForAnotherAdmin);

module.exports = router;
