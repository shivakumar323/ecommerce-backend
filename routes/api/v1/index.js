var express = require('express');
var router = express.Router();
const categoryController = require('../../../src/controllers/categotyController');
const productController = require('../../../src/controllers/productController');
const orderController = require('../../../src/controllers/orderController');
const userController = require('../../../src/controllers/userController');

router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProducts);
router.post("/product/add", userController.isAuthenticated, productController.addProduct); // have to call isAuthenticated before adding product
router.post("/order/all", orderController.listOrders);
router.post("/user/signup", userController.signUp);
router.post("/user/signin", userController.login);
router.post("/order/add", orderController.createOrder);
router.post("/order/edit", orderController.editOrder);

module.exports = router;