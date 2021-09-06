const express=require('express')
require('dotenv').config();




const app=express(); 

app.use('/uploads', express.static('./uploads'))
app.use(require('body-parser').json({extended : true}));
app.use('/user' , require('./Users')())
app.listen( process.env.PORT , () => {
    console.log("Sever has started")
})
