const sqlConnection = require("../services/sqlConnection");

function listOrders(data, cb) {
    var sql = `select od.OrderStatus, od.Total, od.UserID, oi.ProductID, p.NAME, oi.Quantity 
    from orderdetails as od inner join orderitems as oi 
    on od.ID = oi.OrderID inner join products as p on oi.ProductID = p.ID`
    var values = [];

    if(data.userID) {
        sql += " where od.UserID = ?";
        values.push(data.userID);
    }
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}


function findOrderByUser(data, cb) {
    var sql = `select ID as orderId, Total as total 
               from orderdetails 
               where UserId = ? and OrderStatus = 1
               LIMIT 1`;
    var values = [];
    values.push(data.userid);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function addOrder(data, cb) {
    var sql = `insert into orderdetails
               (Total, UserID, OrderStatus, CreatedAt, UpdatedAt) 
               values(?, ?, 1, now(). now())`; 
    var values = [];
    values.push(data.total);
    values.push(data.userid);  
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    }); 
}

function editOrder(data, cb) {
    var sql = `update orderdetails
               set Total = ?, OrderStatus = ?, 
               UpdatedAt = now() 
               where ID = ?`;
    var values = [];
    if(data.payment) {
        sql = `update orderdetails 
               set OrderStatus = ?,
               UpdatedAt = now() where ID = ?`;
        values.push(2);
    } else {
        values.push(data.total);
        values.push(1);
    }
    values.push(data.orderid);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getOrderDetails(data, cb) {
    var sql = `select od.ID as orderId, od.Total as total, 
               p.ID as productID, p.NAME as productName, p.Price as price, 
               oi.Quantity as quantity 
               from orderdetails as od left join orderitems as oi on od.ID = oi.OrderID 
               left join products as p on oi.ProductID = p.ID
               where od.UserID = ? and od.OrderStatus = 1`;
    var values = [];
    values.push(data.userid);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}


module.exports = {listOrders, findOrderByUser, addOrder, editOrder, getOrderDetails};
