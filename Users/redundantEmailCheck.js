const getUser=require('./userinfo')
module.exports = ( req , res , next ) => {
    let users = getUser();
    let index=users.findIndex( e=>e.email === req.body.email)
    if(index == -1){
        next();
    }
    else{
        res.status(200).json({
            message:'This mail already registered'
        })
    }

}