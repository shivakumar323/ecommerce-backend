const orders = require('../models/orderDetails');
const product = require('../models/product');
const orderitem = require('../models/orderItem');

function createOrder(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "invalid params for creating order"
    };
    if(data.userId && data.productId) {
        data.quantity = 1; // for time being hardcoding it
        product.getProductDetails(data, function(err, result) { // we are getting product details which are present in the cart
            if(err) {
                responseData.msg = "Error in creating order";
                return res.status(500).send(responseData);
            }
            orders.findOrderByUser(data, function(err1, result1) {
                if(err1) {
                    responseData.msg = "Error in creating the order";
                    return res.status(500).send(responseData);
                }
                if(result1.length > 0) {
                    data.total = parseInt(result1[0].total, 10) + parseInt(result[0].price, 10);
                    data.quantity += 1;
                    data.orderId = result1[0].orderId;
                    orders.editOrder(data, function(err2, result2) {
                        if(err2) {
                            responseData.msg = "Error in creating order";
                            return res.status(500).send(responseData);
                        }
                        orderitem.editOrderItem(data, function(err3, result3) {
                            if(err3) {
                                responseData.msg = "Error in creating the order";
                                return res.status(500).send(responseData);
                            }
                            responseData.msg = "successfully created an order";
                            responseData.success = true;
                            responseData.orderDetails = {
                                orderId : result1[0].orderId
                            };
                            res.status(200).send(responseData);
                        });
                    }); 
                } else {
                    data.total = parseInt(result[0].price, 10);
                    orders.addOrder(data, function(err2, result2) {
                        if(err2) {
                            responseData.msg = "Error in creating The order";
                            return res.status(500).send(responseData);
                        }
                        data.orderId = result2.insertId; // we are assigning orderid here, since addorder is a insert query in order to fetch the generated OrderID we are using insertId
                        orderitem.addOrderItem(data, function(err3, result3) {
                            if(err3) {
                                responseData.msg = "Error in creating the order";
                                console.log(err3);
                                return res.status(500).send(responseData);
                            }
                            responseData.msg = "successfully created an order";
                            responseData.success = true;
                            responseData.orderDetails = {
                                orderId : result2.insertId
                            };
                            res.status(200).send(responseData);
                        })
                    })
                }
            })
        })
    }
}

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

module.exports = {listOrders, createOrder};