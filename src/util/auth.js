// we are using jsonwebtoken package to authenticate user

const jwt = require('jsonwebtoken');
const User = require('../models/user');

function newToken(user) {
    return jwt.sign({id: user.userID}, 'shhhhh', { expiresIn: '10d' }); /*we are passing userID because 
    user.js model file, in stroongSignIn gunction inside sql query we are selecting ID of user as userID */
}

module.exports = {newToken};
