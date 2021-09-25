const router=require('express').Router()
const User =require('../modals/user')
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
//register
router.post('/register',async(req,res)=>{
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.seckey
          ).toString(),
        }
          );
        const user = await newUser.save();
        res.status(201).json(user);
}
    catch(err)
    {
        res.status(500).json(err)
    }
})
//admin registration
router.post('/Adminregister',async(req,res)=>{
    try{
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
            req.body.password,
            process.env.seckey
          ).toString(),
            admin:req.body.admin,
            profile:req.body.profile
        }
          );
        const user = await newUser.save();
        res.status(201).json(user);
}
    catch(err)
    {
        res.status(500).json(err)
    }
})
//login route
router.post("/login",async(req,res)=>{
    try{
        const user = await User.findOne({ email: req.body.email });
        if(user)
        {
            const bytes = CryptoJS.AES.decrypt(user.password, process.env.seckey);
            const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
            if(originalPassword===req.body.password)
            {
                const accessToken = jwt.sign(
                    { id: user._id,admin:user.admin},
                    process.env.seckey,
                    { expiresIn: "7d" }
                  );
                  const { password, ...info } = user._doc;
                  res.status(200).json({ ...info, accessToken });
            }
            else
            {
                res.status(401).json("wrong password")     
            }
        }
        else
        {
            res.status(401).json("invalid email address")
        }
    }
    catch(err){
        res.json(500).json(err)
    }
})
module.exports=router