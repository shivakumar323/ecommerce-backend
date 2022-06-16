const product = require('../models/product');

function listProducts(req, res) {
    let data = req.body;
    product.listProducts(data, function(err, result) {
        if(err) {
            console.log(err);
            return res.status(500).send({message:  "Not OK"});
        }
        return res.status(200).send({
            message: "successfully fetched products",
            success: true,
            products: result
        })
    })
}

function addProduct(req, res) {
    let data = req.body;
    if(data.name && data.price && data.description && data.categoryId && data.vendorId) {
        product.addProduct(data, function(err, result) {
            if(err) {
                console.log(err);
                return res.status(500).send({message: "Adding product failed"});
            }
            return res.status(200).send({
                message: "successfully added product",
                success: true,
                product: result
            })
        })
    }
}

module.exports = {listProducts, addProduct};