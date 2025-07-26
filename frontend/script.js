
const BASE_URL="http://localhost:5000";
async function getTopProducts() {
  const res=await fetch(`${BASE_URL}/top-products`);
  const data=await res.json()
  const  list=document.getElementById('top-products');
  list.innerHTML='';
  data.forEach((item)=>{
    const li= document.createElement('li');
    li.innerText=`${item.product} - Sold: ${item.sold}`;
    list.appendChild(li);

  })
  
}
async function getOrderStatus() {
const id= document.getElementById('oderId').value;
const res=await fetch(`${BASE_URL}/order-status/${id}`);
const data=await res.json();
document.getElementById('order-status').innerText=json.stringify(data,null,2);
}
async function getStock() {
const name= document.getElementById('productName').value;
const res=await fetch('${BASE_URL}/stock/${name}');
const data=await res.json();
document.getElementById('stock-status').innerText=`${data.in_stock} items in stock for ${data.product}`;
}