const routes=require('express').Router() ;
const postUser=require('../Register/post')
// const getUser = require('./get')
const multer=require('multer')
const allUsers = require('../userinfo')
const jwt=require('jsonwebtoken')
const checkPostRequest=require('../checkPostRequest')
const checkTocken = require('../checkTocken')
const hashPassword = require('../convertPasswordToHash')

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


    routes.post('/' ,upload.single('image') ,checkTocken , ( req , res ) =>{
        console.log(req.body)
        if(req.file){
        if(!req.isImage)
        {
            res.status(200).json({
                message:'Select Proper Image'
            })
        }
    }
        if(req.body.password){
            res.status(200).json({
                message:'Try diffrent APi to update password or remove password from body'
            })
        }
        let newUser ={}
        let autharization = req.headers['authorization']
        let tocken= autharization.split(' ')[1]
        let toDelete;
        jwt.verify( tocken, process.env.SECRET_KEY , ( err , user ) => {
            newUser=user;
            toDelete={...user};
        })
        if(req.body.name) newUser.name=req.body.name;
        if(req.body.email) newUser.email=req.body.email;
        if(req.body.mobile) newUser.mobile=req.body.mobile;
       
        
        if(req.file) {
            
            newUser.image='http://localhost:'+process.env.PORT+'/uploads/'+timestamp+req.body.name+'.'+req.file.originalname.split('.')[1];

        }
        newUser.id=toDelete.id;


        let users=allUsers();
        if(users.findIndex(e => e.id === toDelete.id)==-1){
            res.status(200).json({
                message:'Use your tocken'
            })
        }

        users.splice(users.findIndex(e => e.id === toDelete.id),1);
        
        postUser(newUser);
         
        console.log("Done");
        res.status(200).json({
            message:"Done"
        })

        
    });





    routes.use('/password' , require('./password')());

    
    return routes;
}