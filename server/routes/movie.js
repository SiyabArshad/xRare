const verify =require('../middlewares/verify')
const router=require('express').Router()
const Video =require('../modals/movie')
//create
router.post('/addvideo',verify,async(req,res)=>{
   if(req.user.admin)
   {
    try{
        const video=new Video(req.body)
        const newvideo=await video.save()
        res.status(200).json(newvideo)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
else{
    res.status(401).json("Only admin can perform this operation")
}
})
//update
router.put("/updatevideo/:id", verify, async (req, res) => {
if(req.user.admin)
{
    try {
        const updatedvideo = await Video.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedvideo);
      } catch (err) {
        res.status(500).json(err);
      }

}
else
{
    res.status(401).json("Only admin can perform this operation")
}
})
//delete
router.delete("/deletevideo/:id", verify, async (req, res) => {
    if (req.user.admin) {
      try {
        await Video.findByIdAndDelete(req.params.id);
        res.status(200).json("Video has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("Only admin can perform this action!");
    }
  }); 
//Read
router.get("/videos",verify,async(req,res)=>{
  try{
    let videos
    if(req.user.id)
    {
      if(req.query.cat)
      {
        videos=await Video.find({category:req.query.cat})
      }
      else{
     videos=await Video.find();
      }
     res.status(200).json(videos)
  }
  else
  {
    res.status(401).json("you are not allowed!")
  }
  }
  catch(err)
  {
    res.status(500).json(err)
  }
})
//geting video by id
router.get('/video/:id',verify,async(req,res)=>{
  try{
    if(req.user.id)
    {
      const videos=await Video.findById(req.params.id)
       res.status(200).json(videos)
    }
    else
    {
       res.status(401).json("you are not allowed!")
    }
  }
  catch(err)
  {
    res.status(500).json(err)
  }
})
//total number of videos
router.get('/totalvideos',verify,async(req,res)=>{
     if (req.user.admin) {
        try {
          const videos = await Video.count();
          res.status(200).json(videos);
        } catch (err) {
          res.status(500).json(err);
        }
      } else {
        res.status(403).json("You are not allowed to see totalVideos!");
      }  
})
//getting latest videos
router.get("/latestvideos",verify,async(req,res)=>{
  if(req.user.id)
  {
    try{
      const latestvideos=await Video.find().limit(15).sort({$natural:-1})
      res.status(200).json(latestvideos)
    }
    catch(err)
    {
          res.status(500).json(err);
    }
  }
  else
  {
     res.status(401).json("you are not allowed!")
  }
})
//get last video
router.get("/lastvideo",verify,async(req,res)=>{
  if(req.user.id)
  {
    try{
      const latestvideos=await Video.findOne().sort({$natural:-1})
      res.status(200).json(latestvideos)
    }
    catch(err)
    {
          res.status(500).json(err);
    }
  }
  else
  {
     res.status(401).json("you are not allowed!")
  }
})

//search api
router.get("/searchvideo",verify, async (req, res) => {
    try{
      if(req.user.admin)
      {  
      const videos=await Video.find({title:{$regex:req.query.title,$options:'$i'}})
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

module.exports=router