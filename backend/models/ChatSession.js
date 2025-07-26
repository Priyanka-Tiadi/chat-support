const mongoose=require('mongoose');
const ChatSessionSchema=new mongoose.Schema({
  user:{type:mongoose.Schema.Types.ObjectId,ref:'User'}
})
module.exports=mongoose.model('User',UserSchema)