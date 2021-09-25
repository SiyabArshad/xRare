const mongoose=require('mongoose')
const videoschema=new mongoose.Schema({
    title:{type:String,required:true},
    desc:{type:String},
    img:{type:String},
    video:{type:String,required:true},
},{timestamps:true})
module.exports=mongoose.model("videos",videoschema)