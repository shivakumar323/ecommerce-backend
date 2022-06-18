const sqlConnection = require('../services/sqlConnection');

function signUp(data, cb) {
    var sql = `Insert into users(Username, Password, UserType, CreatedAt, UpdatedAt)
               values(?, ?, ?, now(), now())`;
    var values = [];

    values.push(data.username);
    values.push(data.password);
    values.push(data.usertype);

    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function getUserSignupDetails(data, cb) {
    var sql = `select * from users
               where Username = ?`;
    var values = [];

    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}

function login(data, cb) {
    var sql = `select ID as userID, Username, UserType
               from users
               where Username = ? and Password = ?`;
    var values = []
    values.push(data.username);
    values.push(data.password);

    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    })
}


module.exports = {signUp, getUserSignupDetails, login};