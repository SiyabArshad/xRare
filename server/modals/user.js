const mongoose=require('mongoose')
const userschema=new mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    admin:{type:Boolean,default:false},
    profile:{type:String,default:""}
},{timestamps:true})
module.exports=mongoose.model("users",userschema)