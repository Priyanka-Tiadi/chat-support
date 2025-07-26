const mongoose=require('mongoose');
const ProductSchema=new mongoose.Schema({
  StockCode: String,
  Description:String,
  Quantity:Number,
  UnitPrice:Number,
  Country:String
})
module.exports=mongoose.model('Product',ProductSchema)