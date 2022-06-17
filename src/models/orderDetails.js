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

module.exports = {listOrders};
