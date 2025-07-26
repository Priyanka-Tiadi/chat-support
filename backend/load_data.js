const fs=require('fs')
const csv=require('csv-parser')
const mongoose=require('mongoose')
const Product=require('./models/Products');
mongoose.connect('mongodb://localhost:27071/ecommerce',{useNewUrlParser:true});
fs.createReadStream('data.csv')
.pipe(csv())
.on('data',async(row)=>{
  const product=new Product(row);
  await product.save();
})
.on('end',()=>{
  console.log('csv file proceed');
  mongoose.connection.close()
  
})