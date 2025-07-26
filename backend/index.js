
const express=require('express');
const fs=require('fs');
const csv=require('csv-parser');
const cors=require('cors')
const mongoose=require('mongoose')
const Messgae=require('./models/Message')


const app=express()
const PORT=5000;
app.use(cors())
mongoose.connect(mongodb+srv://<username>:<password>@cluster0.kjnvn.mongodb.net/myDatabase?retryWrites=true&w=majority
)

function readCSV(filePath){
return new Promise((resolve,reject)=>{
  const results=[];
  fs.createReadStream(filePath)
  .pipe(csv())
  .on('data',(data)=>results.push(data))
  .on('end',()=>resolve(results))
  .on('error',reject)
});
}
app.get('/top-products',async(req,res)=>{
  const items=await readCSV('./data/inventory_items.csv');
  const soldCounts={};
  items.forEach((item)=>{
    if(item.sold_at){
      const product =item.product_name;
      soldCounts[product]=(soldCounts[product]||0)+1;

    }
  })
  const sorted=Object.entries(soldCounts)
  .sort((a,b)=>b[1]-a[1])
  .slice(0,5)
  .map(([product,count])=>({product, sold: count}))
  res.json(sorted)
})

//Route: Order status
app.get('/order-status/:id',async(req,res)=>{
  const orders= await readCSV('./data/orders.csv');
 const order=orders.find((o)=>o.order_id===req.params.id)
 if(order){
  res.json({
    order_id: order.order_id,
    status:order.status,
    shipped_at: order.shipped_at,
    delivered_at:order.delivered_at,
    returned_at: order.returned_at,
  })
 } else{
  res.status(404).json({message:'order not found'})
 }
})
app.get('/stock/:name',async(req,res)=>{
  const items=await readCSV('./data/inventory_items.csv')
  const filtered=items.filter(
    (item)=>
      item.product_name.toLowerCase()===req.params.name.toLowerCase() &&
    item.sold_at === ''
  );
  res.json({
    product: req.params.name,
    in_stock: filtered.length,

  })
})
app.listen(PORT, () =>{
  console.log('server running at http://localhost:${PORT}');
  
})