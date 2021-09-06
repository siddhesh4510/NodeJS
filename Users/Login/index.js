const routes = require('express').Router()
const getUsers = require('../userinfo')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const multer=require('multer')


module.exports = () => {
    // routes.use(require('body-parser').json({extended : true}));
    routes.post('/' , ( req , res ) => {
        users=getUsers()

        let matchedUsers=users.filter( (user) => 
        {
            return user.email === req.body.email
        })
        if (matchedUsers.length > 0) {
            // return matchedUsers[0];
                        
            bcrypt.compare(req.body.password , matchedUsers[0].password , ( err , isMatch ) => {
                if(err) console.error(err);
                else if(isMatch) {
                    console.log("Matched");
                    let tocken=jwt.sign( matchedUsers[0], process.env.SECRET_KEY )
                    res.status(200).json({
                        message:'Logged in successfully',
                        tocken:tocken

                    })
                }
                else{
                    console.log("Dosent match")
                    res.status(200).json({
                        message:'Wrong Password'
                    })
                }
            })

        }
        else{
            res.status(200).json({
                message:'user not found'
            })
        }
        // return 'None';
        })
    

        return routes ;
}