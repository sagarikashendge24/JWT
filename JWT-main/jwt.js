const express=require('express')
const r=require('readline-sync')
const jwt = require('jsonwebtoken');
var idd=r.question("enter the id ");
var name=r.question("enter the name ")
var sc=r.question("enter the secretre code")
const token=jwt.sign({id:idd,name:name},sc,{})
var userVer=jwt.verify(token,sc);
console.log(userVer)
console.log(token)















// const express = require('express')
// const app = express()
// const jwt =require("jsonwebtoken");

// var idd=r.question("enter the id ")
// var sc=r.question("enter the secretre code")

// const createToken=async()=>{
//     const token=await jwt.sign({_id:idd},sc,{
//     expiresIn:"2  seconds"
//     })
//     console.log(token);
//     userVer=await jwt.verify(token,"mynameisvinodbahadurthapa");
//     console.log(userVer);
// }
// createToken();
// app.listen(4000,()=> {
//     console.log(`server is runing at port no `);

// })





