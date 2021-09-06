const routes=require('express').Router() ;
const postUser=require('./post')
const getUser = require('./get')
const multer=require('multer')
const allUsers = require('../userinfo');
const jwt=require('jsonwebtoken');
const checkPostRequest=require('../checkPostRequest');
const checkTocken = require('../checkTocken');
const hashPassword = require('../convertPasswordToHash');
const checkMail =require('../redundantEmailCheck');

// const upload=multer({dest:'uploads/'})
let timestamp;
const fileFilter=( req , file , next )=>{
    if( file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg')
    {
        req.isImage=true;
        next( null , true );

    }
    else{
        req.isImage=false;
        next( null , true );
    }
}
const storage=multer.diskStorage(
    {
        destination:function(req , file , next){
            next(null , 'uploads/');
        } ,
        filename:function(req, file ,next){
            timestamp=Date.now().toString();
            next(null , timestamp+req.body.name+'.'+file.originalname.split('.')[1]) 
        }
    }
)
const upload=multer(
    {
        storage:storage ,
        fileFilter:fileFilter
    })



module.exports = () => {


    routes.post('/' ,upload.single('image') ,checkPostRequest ,hashPassword ,checkMail , ( req , res ) =>{
        // console.log(req.body)
        if(!req.isImage)
        {
            res.status(200).json({
                message:'Select Proper Image'
            })
            res.end()
        }
        let lst=Date.now().toString()+req.body.name+'.'+req.file.originalname.split('.')[1]
        // console.log(lstt)
        // console.log(req.body.name)
        let newUser={
            'id': Math.floor(Math.random()*1000),
            'name': req.body.name ,
            'image':'http://localhost:'+process.env.PORT+'/uploads/'+timestamp+req.body.name+'.'+req.file.originalname.split('.')[1],
            'email': req.body.email ,
            'password': req.body.password ,
            'mobile':req.body.mobile ,
        }
        postUser(newUser)
        // let tocken=jwt.sign( newUser, process.env.SECRET_KEY )
        // console.log(tocken)
        res.json( {
            message:'Registered Successfully ,do log in and get tocken',
            
        })
    });





    routes.get( '/' ,checkTocken , ( req, res ) =>{
        res.status(200).json({
            users:allUsers()
        })
    });
    
    return routes;
}