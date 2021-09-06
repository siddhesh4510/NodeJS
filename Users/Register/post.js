const getUser = require('../userinfo')
const routes = require('express').Router()


module.exports = ( newUser ) => {
    let users = getUser();
    // console.log(users)
    users.push(newUser);
    // console.log(users)
}