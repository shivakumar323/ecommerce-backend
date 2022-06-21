const sqlConnection = require('../services/sqlConnection');

function addOrderItem(data, cb) {
    var sql = `insert into orderitems
               (OrderID, ProductID, Quantity, CreatedAat, UpdatedAt) 
               values(?, ?, ?, now(), now())`;
    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    values.push(data.quantity);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getOrderItems(data, cb) {
    var sql = `select * from orderitems 
               where OrderID = ? and ProductID = ?`;
    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function editOrderItem(data, cb) {
    var sql = `update orderitems set Quantity = ?, UpdatedAt = now()
               where OrderID = ? and ProductID = ?`;
    var values = [];
    values.push(data.quantity);
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function deleteOrderItem(data, cb) {
    var sql = `delete from orderitems 
               where OrderID = ? and ProductID = ?`;
    var values = [];
    values.push(data.orderId);
    values.push(data.productId);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {addOrderItem, getOrderItems, editOrderItem, deleteOrderItem};