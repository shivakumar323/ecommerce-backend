const sqlConnection = require('../services/sqlConnection');

function listProducts(data, cb) { // this function is used to get the all products which bwlong to given categoryID input. here in place of data we are passing categoryID  
    var sql = "select ID as productId, NAME as name, Price as price from products";
    var values = [];
    if(data.CategoryID) {
        sql += "where CategoryID = ?";
        values.push(data.CategoryID);
    }
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {listProducts};