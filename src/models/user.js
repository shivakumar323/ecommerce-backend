const sqlConnection = require('../services/sqlConnection');
var bcrypt = require('bcryptjs');
const auth = require('../util/auth');


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

// below function strongSignUp is used to encrypt the password using bcrypt package
function strongSignUp(data, cb) {
    var sql = `Insert into users(Username, UserType, Password, CreatedAt, UpdatedAt)
               values(?, ?, ?, now(), now())`;
    var values = [];

    values.push(data.username);
    values.push(data.usertype);
    bcrypt.hash(data.password, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return;
        }
        values.push(hash);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    });   
}

function getUserSignupDetails(data, cb) {
    var sql = `select * from users
               where Username = ?`;
    var values = [];

    values.push(data.username);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
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
    });
}

function strongSignIn(data, cb) {
    var sql = `select ID as userID, Username, Password, UserType
               from users
               where Username = ?`;
    var values = []
    values.push(data.username);

    sqlConnection.executeQuery(sql, values, function(err, result) {
        const isValidPassword = bcrypt.compareSync(data.password, result[0].Password);
        if(isValidPassword) {
            const token = auth.newToken(result[0]);
            const response = [
                {
                    userId: result[0].userID,
                    userName: result[0].Username,
                    userType: result[0].UserType,
                    authToken: token
                }
            ];
            cb(err, response);
        } else {
            cb(err, []);
        }
    });
}

function getUserById(id, cb) {
    let sql = `select ID as userID, Username, UserType
               from users
               where ID = ?`;
    let values = [];
    values.push(id);
    sqlConnection.executeQuery(sql, values, function(err, result) {
        cb(err, result);
    });
}

function changePassword(data, cb) {
    var sql = `update users set Password = ?, UpdatedAt = now() 
               where ID = ?`;
    var values = [];
    bcrypt.hash(data.password, 8, function(err, hash) {
        if(err) {
            console.log(err);
            return
        }
        values.push(hash);
        values.push(data.userid);
        sqlConnection.executeQuery(sql, values, function(err, result) {
            cb(err, result);
        });
    })
}

module.exports = {signUp, strongSignUp, getUserSignupDetails, login, strongSignIn, getUserById, changePassword};