// const { use } = require('bcrypt/promises');
// const { send } = require('express/lib/response');
const user = require('../models/user');

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
                user.signUp(data, function(err1, result) {
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

module.exports = {signUp};