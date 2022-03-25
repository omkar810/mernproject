const mongoose = require('mongoose');
const dotenv = require("dotenv");
const express = require('express');
const app = express();

dotenv.config({path: './config.env'});
require('./db/conn');
app.use(express.json({ extended: false }));
app.use("/payment", require("./router/payment"));

app.use(require('./router/auth'));
const User = require('./model/userSchema');
const PORT = process.env.PORT;


// const middleware = (req, res, next) =>{
//     console.log('hello middleware');
//     next();
// }
// app.get('/signup', middleware,(req, res)=>{
//     res.send('hello signup')
// });
app.get('/signin',(req, res)=>{
    res.send('hello signin')
});
app.listen(PORT, ()=>{
    console.log(`port running at ${PORT}`)
})