const routes=require('express').Router() ;
const getUser = require('./Register/get') ;
const checkTocken = require('./checkTocken');
const jwt=require('jsonwebtoken');

module.exports= () => {
    routes.use('/register' , require('./Register')());
    routes.use('/login' , require('./Login')());
    routes.use('/update' , require('./Update')());
    routes.get('/:email' ,  ( req, res ) =>{
        if( getUser(req.params.email) !='None' ){
        let user=getUser(req.params.email);
        res.status(200).json({
           name: user.name,
           email: user.email,
           image: user.image
        })
        }
        else{
        res.status(404).json({
            message: 'No user of such name'
        })
        }

    });
    routes.get('/' , checkTocken , ( req, res ) =>{
        let autharization = req.headers['authorization']
        let tocken= autharization.split(' ')[1]
        let toShow;
        jwt.verify( tocken, process.env.SECRET_KEY , ( err , user ) => {
            
            toShow={...user};
        })
        let users=require('./userinfo')()
        let index=users.findIndex(e => e.id === toShow.id)
        res.status(200).json(users[index]);

    });


    
    return routes ;
}