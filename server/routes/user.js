const verify =require('../middlewares/verify')
const router=require('express').Router()
const User =require('../modals/user')
const CryptoJS = require("crypto-js");
const nodemailer = require('nodemailer');
//update user
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.admin) {
      if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(
          req.body.password,
          process.env.seckey
        ).toString();
      }
  
      try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You can update only your account!");
    }
  });
//delete user
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.admin) {
      try {
       const duser= await User.findByIdAndDelete(req.params.id);
       const{ password, ...info }=duser._doc 
       res.status(200).json(info);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You cannot delete your account!");
    }
  });  
//get users
//get user by id
router.get("/user/:id",verify, async (req, res) => {
  if(req.user.id===req.params.id || req.user.admin)
  {  
  try {
      const user = await User.findById(req.params.id);
      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err);
    }
  }
  else
  {
    res.status(401).json("you can see only your account")
  }
  });
//get all users
router.get("/users", verify, async (req, res) => {
    if (req.user.admin) {
      try {
        const users = await User.find();
        res.status(200).json(users);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed to see all users!");
    }
  });
//get total number of users
router.get("/allusers", verify, async (req, res) => {
    if (req.user.admin) {
        try {
          const users = await User.count();
          res.status(200).json(users);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed to see totalusers!");
      }    
})
//search api
router.get("/searchuser",verify, async (req, res) => {
  try{
    if(req.user.admin)
    {  
    const videos=await User.find({username:{$regex:req.query.name,$options:'$i'}})
      res.status(200).json(videos)
    }
    else
    {
      res.status(401).json("not found")
    }
  }
  catch(err)
  {
    res.status(500).json("something wentwrong"+err)
  }

})

//sendemail
router.post("/reset",async(req,res)=>{
  try{
  const user=await User.findOne({email:req.body.email})
  if(user)
  {
      let randompass=Math.floor(Math.random()*100000+1)
      let pass="xrare"+randompass+"abc"
      let newpass
      if (randompass) {
        newpass = CryptoJS.AES.encrypt(
          pass,
          process.env.seckey
        ).toString();
      }

      let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'siyabarshadsatti@gmail.com',
            pass: 'khuzdarbalochistan7788'
        }
    });
    let mailDetails = {
        from: 'siyabarshadsatti@gmail.com',
        to: req.body.email,
        subject: 'xRare Password Recovery',
        text: `we provide you a new password ${pass} kindly update it later Thank you`
    };
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs');
        } else {
          user.password=newpass
            user.save()
            res.status(200).json("Email has been sent sucessfully");
        }
    });
  }
  else
  {
    res.status(401).json("email not exist")
  }
}
catch(err)
{
  res.status(500).json(err)
}
})
module.exports=router