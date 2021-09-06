const bcrypt = require('bcryptjs');
// $2a$10$amdhI1eDqg9L4kdSXY0fN.VPVEQ3HwAwYOw4O4HriX68FLA1a4ZCq

module.exports = async ( req , res , next ) => {
    try{
        // console.log("hi"+req.body.password)
        const salt = await bcrypt.genSalt(10);
        const hashPasword = await bcrypt.hash(req.body.password , salt);
        req.body.password = hashPasword;
        // console.log("hi"+req.body.password)
        next();
    }
    catch( err ){
        console.log( err );
    }
}
