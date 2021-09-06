const jwt=require('jsonwebtoken')
module.exports = ( req, res, next ) => {
    let autharization = req.headers['authorization']
    console.log("in checkTocken")
    let tocken= autharization && autharization.split(' ')[1]
    if( tocken ){
        jwt.verify( tocken, process.env.SECRET_KEY , ( err , user ) => {
            if( err ) {
                res.status(403).json({ message:"Access denied"})
            }
            next();
        })
    }
    else{
        res.status(401).json({message:'tocken required'})
    }
    // console.log(req.user)
    // console.log(autharization)
    next()
}