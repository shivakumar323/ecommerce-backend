const user = require('../models/user');
const auth = require('../util/auth');

function signUp(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for signup"
    }
    if(data.username && data.password) {
        user.getUserSignupDetails(data, function(err, result) {
            if(err) {
                console.log(err);
                responseData.msg = "error in sign up";
                return res.status(500).send(responseData);
            }
            if(result.length > 0) {
                responseData.msg = "User already exists";
                return res.status(500).send(responseData);
            } else {
                user.strongSignUp(data, function(err1, result) {
                    if(err1) {
                        console.log(err1);
                        return res.status(500).send(responseData);
                    }
                    responseData.success = true;
                    responseData.msg = "Successfully signed up";
                    responseData.data = {
                        username: data.username,
                        usertype: data.usertype
                    };
                    return res.status(200).send(responseData);
                })
            }
        })
    }
    else {
        return res.status(400).send(responseData);
    }
}

function login(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        msg: "Invalid details for login please check your login credentials"
    }
    if(data.username && data.password) {
        user.strongSignIn(data, function(err, result) {
            if(err) {
                res.status(500).send(responseData);
            }
            if(result.length == 0) {
                responseData.msg = "invalid credentials";
                responseData.isRegisteredUser = false;
                res.status(500).send(responseData);
            }
            responseData.success = true;
            responseData.msg = "successfully logged in";
            responseData.data = result;
            return res.status(200).send(responseData);
        })
    }
    else {
        return res.status(400).send(responseData);
    }

}


function isAuthenticated(req, res, next) { // we are passing next parameter in order to execute function placed in next position(this is a middle ware concept) 
    const token = req.headers.auth; // we are going to get token from header of api request
    let response;
    try {
        response = auth.verifyToken(token);
    } catch(err) {
        console.log(err);
        return res.status(401).send({msg: "Invalid token"});
    }
    user.getUserById(response.id, function(err, result) { // id we are getting from newToken method of auth.js
        if(err) {
            return res.status(401).send({message: "Invalid user"});
        }
        req.user = result; // we are going to store user object returned by getUserById function in request.user parameter
        next(); // at the end we are going to execute the function which is passed as a parameter(next) to the fuction isAuthenticated
    }); 
}

function changePassword(req, res) {
    let data = req.body;
    let responseData = {
        success: false,
        message: "error in changing password"
    };
    if(data.password && data.userid) {
        user.changePassword(data, function(err, result) {
            if(err) {
                console.log(err);
                res.status(500).send(responseData);
            }
            responseData.message = "Successfully changed the password";
            responseData.success = true;
            res.status(200).send(responseData);
        })
    }
}

module.exports = {signUp, login, isAuthenticated, changePassword};