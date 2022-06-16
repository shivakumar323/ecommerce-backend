var express = require('express');
var router = express.Router();
const categoryController = require('../../../src/controllers/categotyController');


router.post("/category/all", categoryController.listCategories);

module.exports = router;