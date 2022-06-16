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

module.exports = {listProducts};