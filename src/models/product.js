const sqlConnection = require('../services/sqlConnection');

function listProducts(data, cb) { // this function is used to get the all products which bwlong to given categoryID input. here in place of data we are passing categoryID  
    var sql = "select ID as productId, NAME as name, Price as price from products";
    var values = [];
    if(data.categoryID) {
        sql += " where CategoryID = ?";
        values.push(data.categoryID);

        if(data.minPrice) {
            sql += " and Price >= ?";
            values.push(data.minPrice);
        }
    }
    else if(data.minPrice) {
        sql += " where Price >= ?";
        values.push(data.minPrice);
    }
    else if(data.maxPrice) {
        sql += " where Price <= ?";
        values.push(data.maxPrice);
    }
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

module.exports = {listProducts};