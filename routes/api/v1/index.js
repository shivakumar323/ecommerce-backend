var express = require('express');
var router = express.Router();
const categoryController = require('../../../src/controllers/categotyController');
const productController = require('../../../src/controllers/productController');

router.post("/category/all", categoryController.listCategories);
router.post("/product/all", productController.listProducts);
router.post("/product/add", productController.addProduct);
module.exports = router;