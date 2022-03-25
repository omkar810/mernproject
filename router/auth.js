const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const authenticate = require("../middleware/authenticate");

const router = express.Router();

require('../db/conn');
const User = require('../model/userSchema');

// router.get('/',(req, res)=>{
//     res.send('hello router')
// });
router.use(cors());

router.post('/register',(req, res)=>{
    const {fname, lname , email, phone, password, cpassword} = req.body;

    if (!fname || !lname ||  !email || !phone || !password || !cpassword) {
        return res.status(422).json({error:"Please fill up the details"})
    }
    User.findOne({ email: email })
    .then((userExist)=>{
        if(userExist){
            return res.status(422).json({error:"Email alredy Exist"});
        }
        else if(password != cpassword){
            return res.status(422).json({error:"Password is not matching"});
        }
        else if(password.length < 6 || password.length > 15){
            return res.status(422).json({error:"Password should be 6 to 15 digits"});
        }
        else if(phone.length < 10 || phone.length > 10){
            return res.status(422).json({error:"Number should be 10 digits"});
        }
        else if(fname.length < 3){
            return res.status(422).json({error:"First name should be  complete"});
        }else if(lname.length < 3){
            return res.status(422).json({error:"Last name should be  complete"});
        }else if(email.length < 5){
            return res.status(422).json({error:"Email id should be complete"});
        } else if(fname.length > 20){
            return res.status(422).json({error:"First name too large"});
        }else if(lname.length > 20){
            return res.status(422).json({error:"Last name too large"});
        }else if(email.length > 25){
            return res.status(422).json({error:"Email id too large"});
        }
        else if(fname === lname){
            return res.status(422).json({error:"First name and Last name should be diffrent"});
        }
        const user = new User ({fname, lname , email, phone, password, cpassword});

        user.save().then(()=>{
        res.status(201).json({message: "Registration successfully completed"});
        }).catch((err) => res.status(500).json({error:"Failed to register"}));
    }).catch(err=>{console.log(err); });

});

router.post('/login', async(req, res)=>{
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({error:"Please fill up the details"})
        }
        const userLogin = await User.findOne({email: email});
        if (userLogin){
                 const isMatch = await bcrypt.compare(password, userLogin.password);
                 token = await userLogin.generateAuthToken();
                 console.log(token);
                 res.cookie('jwtoken', token,{
                     expires: new Date(Date.now() + 25892000000),
                     httpOnly:true
                 })
            if(!isMatch){
                res.status(400).json({error:"Invalid username or password"})
            }
            else{
            res.json({message:"Signin Successfully"})
            }
        }
        else{
            res.status(400).json({error:"Invalid username or password"})
        }

    }
    catch(err){
        console.log(err);
    }
});
router.use(cookieParser());
router.get("/Dashboard", authenticate,(req, res)=>{
    res.send(req.rootUser);
});
router.get("/CourseCart", authenticate,(req, res)=>{
    res.send(req.rootUser);
});
router.get("/Header", authenticate,(req, res)=>{
    res.send(req.rootUser);
});
router.get("/getdata", authenticate,(req, res)=>{
    res.send(req.rootUser);
});
router.get("/Contact", authenticate,(req, res)=>{
    res.send(req.rootUser);
});
router.post("/Contact", authenticate,async(req, res)=>{
    try{
        const {fname, lname, email, message} = req.body;
        if(!fname || !lname || !email || !message){
            return res.json({ error:"Please fill the details"});
        }
        const userContact = await User.findOne({ _id: req.userID});
        if (userContact) {
            const userMessage = await userContact.addMessage(fname, lname, email, message);
            await userContact.save();
            res.status(201).json({message:"Submitted successfully"});
        }
    } catch(error){
        console.log(error);
    }
});
router.get("/Logout", authenticate, async(req, res)=>{
    try{
        console.log('Hello logout page');
        req.rootUser.tokens = req.rootUser.tokens.filter((currElement)=>{
            return currElement.token != req.token;
        })
        res.clearCookie('jwtoken', { path: '/' });
        res.status(200).send('User logout');

        await req.rootUser.save();
        res.render("login");
    } catch(error){
        res.status(500).send(error);
    }
});


module.exports = router;
