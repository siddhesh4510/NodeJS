const getUsers = require('../userinfo')

module.exports = ( userEmail ) => {
    users=getUsers()
    let matchedUsers=users.filter( (user) => 
    {
        return user.email === userEmail
    })
    if (matchedUsers.length > 0) {
        return matchedUsers[0];
    }
    return 'None';

}