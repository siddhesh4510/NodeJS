const routes=require('express').Router();
const checkTocken = require('../checkTocken');
const hashPassword = require('../convertPasswordToHash');
const jwt=require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const getAlluser = require('../userinfo');




module.exports = () => {
    routes.post('/' ,hashPassword ,checkTocken, (req, res) => {
        let autharization = req.headers['authorization']
        
        let tocken= autharization && autharization.split(' ')[1]
        let fetchedUser;
        jwt.verify( tocken, process.env.SECRET_KEY , ( err , user ) => {
            
            fetchedUser = {...user};
        })
        bcrypt.compare(req.body.oldpassword , fetchedUser.password , ( err , isMatch ) => {
            if(err) console.error(err);
            else if(isMatch) {
                console.log("Matched");
                let users=getAlluser()

                let index=users.findIndex( e=>e.id ===fetchedUser.id)
                if(index==-1)
                {
                    res.json({message:"Use Your Tocken"});
                }
                console.log(index)
                users[index]['password'] = req.body.password;
                
                
                res.status(200).json({ 
                    message:"Done"
                });

        
               
            }
            else{
                console.log("Dosent match")
                res.status(200).json({
                    message:'Wrong Old Password'
                })
            }
        })


    })


    return routes;

}