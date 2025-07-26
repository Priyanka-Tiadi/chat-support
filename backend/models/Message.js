const mongoose=require('mongoose');
const MessageSchema=new mongoose.Schema({
 session:{type:mongoose.Schema.Types.ObjectId,ref:'ChatSession'},
 sender:String,
 text:String,
})
module.exports=mongoose.model('User',UserSchema)