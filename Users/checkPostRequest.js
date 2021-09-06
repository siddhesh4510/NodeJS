module.exports = ( req , res , next ) => {

    if( req.body.name && req.body.email  && req.body.mobile  && req.file )
    {   
        next();
    }
    else{
        res.status(200).json({
            message:'All filds are not defined'
        })
    }

}