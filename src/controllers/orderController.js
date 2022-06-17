const orders = require('../models/orderDetails');

function listOrders(req, res) {
    let data = req.body;
    orders.listOrders(data, function(err, result) {
        if(err) {
            console.log(err);
            return res.status(500).send({message:  "Not OK"});
        }
        return res.status(200).send({
            message: "successfully fetched orders of user",
            success: true,
            orderDetails: result
        })
    })
}

module.exports = {listOrders};