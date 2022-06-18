var express = require('express');
var router = express.Router();
const categoryController = require('../../../src/controllers/categotyController');
const productController = require('../../../src/controllers/productController');
const orderController = require('../../../src/controllers/orderController');
const userController = require('../../../src/controllers/userController');
router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProducts);
router.post("/product/add", productController.addProduct);
router.post("/order/all", orderController.listOrders);
router.post("/user/signup", userController.signUp);
router.post("/user/signin", userController.login);

module.exports = router;