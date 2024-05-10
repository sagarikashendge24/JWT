var express = require('express');
const jwt = require('jsonwebtoken');
var db  = require('./Databases');
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connection = require('./Databases');
var app = express()

app.use(express.json())
app.use(cookieParser());                             
app.use(bodyParser.json());

app.get("/token",(req,res)=>{
    let token = req.headers.authorization;
    if(token && token.startsWith('Bearer ')){
          token = token.slice(11, 212)
    if(token){
        try{
            let decoded = jwt.decode(token, "secret");
            req.decoded = decoded;
            res.status(200).send("Valid Token");
        }catch(err){
            res.status(403).send({
                success:false,
                message:err
            })
        }
    }else{
           return res.status(403).json({
               success:false,
               message:'Unauthorized'
           })
       }
   };
});

app.post("/signup",(req,res)=>{
    try{
        inputData = {
            username:req.body.username,
            email:req.body.email,
            password:req.body.password
        };
        connection.query("Insert into LoginTable (Name,Email,Password) VALUES ('"+inputData.username+"','"+inputData.email+"','"+inputData.password+"')",function(err, result)      
        {if (err) throw err;
            console.log('User data inserted..')
            res.send('You are registered successfully..');
        });
    }catch (error){
         res.send("404 error")
    };
});

app.post("/login",(req,res)=>{
    try{
     const inputData = {
        name:req.body.username,
        password:req.body.password
    };
    const name = inputData.name;
    const password = inputData.password;
    const email = inputData.email
    connection.query(`select * from LoginTable where Name='${inputData.name}' and Password='${inputData.password}'`,function(err,result){
        if(err) throw err;
        if (result < 0) {
            res.status(404).json({
            message:"Authentication Failed !"
        });
        }else {
            if(result){
            var token = jwt.sign({email,password},"secret",
            {
                expiresIn:"1h"
            });
            res.cookie("jwt",token).json({
            message:"Authentication successful..",
            token:token
            });
            }else{
            res.status(404).json({
                message:"Failed",
            });
            };
        };
    });
    }catch(error){
        res.status("404").send(`Invalid username & password! ${error}`);
    };
});

app.listen(3000,() => {
    console.log('Listening to the port..')
});