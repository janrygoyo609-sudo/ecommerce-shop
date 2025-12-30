let cart = [];
const SHIPPING = 100;

// Sample products
const products = [
  {name:"Orange Pie", price:299, img:"images/orangepie.png"},
  {name:"USB to LAN", price:399, img:"images/usbtolan.png"},
  {name:"Memory Card", price:200, img:"images/memorycard.png"}
];
localStorage.setItem('products', JSON.stringify(products));

function showSection(id){
  document.querySelectorAll('.section').forEach(sec=>sec.style.display='none');
  document.getElementById(id).style.display='block';
}

// Render products
function renderProducts(){
  const container = document.getElementById('productContainer');
  container.innerHTML = '';
  products.forEach((p, i)=>{
    container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card shadow-sm product-card">
          <img src="${p.img}" class="card-img-top" alt="${p.name}">
          <div class="card-body text-center">
            <h5>${p.name}</h5>
            <p class="text-danger fw-bold">₱${p.price}</p>
            <button class="btn btn-danger w-100" onclick="addToCart(${i})">Add to Cart</button>
          </div>
        </div>
      </div>`;
  });
}
renderProducts();

// Customer signup/login
function signup(){
  const user = document.getElementById('signupUser').value;
  const number = document.getElementById('signupNumber').value;
  const pass = document.getElementById('signupPass').value;
  if(!user||!number||!pass){ alert("Fill all fields"); return; }

  const users = JSON.parse(localStorage.getItem('users')||'[]');
  if(users.some(u=>u.username===user)){ alert("Username exists"); return; }

  users.push({username:user, number, pass});
  localStorage.setItem('users', JSON.stringify(users));
  alert("Sign Up successful!");
}

function login(){
  const user = document.getElementById('loginUser').value;
  const pass = document.getElementById('loginPass').value;
  const users = JSON.parse(localStorage.getItem('users')||'[]');
  const found = users.find(u=>u.username===user && u.pass===pass);
  if(found){
    alert("Logged in successfully!");
    localStorage.setItem('loggedInUser', user);
  } else alert("Incorrect username/password!");
}

// Cart functions
function addToCart(index){
  if(!localStorage.getItem('loggedInUser')) { alert("Please login first"); return; }
  cart.push(products[index]);
  displayCart();
}

function displayCart(){
  const cartDiv = document.getElementById('cart');
  cartDiv.innerHTML = '';
  let subtotal = 0;
  cart.forEach(item=>{
    cartDiv.innerHTML += `<p>${item.name} - ₱${item.price}</p>`;
    subtotal += item.price;
  });
  document.getElementById('subtotal').innerText = subtotal;
  document.getElementById('shipping').innerText = SHIPPING;
  document.getElementById('grandtotal').innerText = subtotal + SHIPPING;
}

function sendOrder(e){
  e.preventDefault();
  if(cart.length===0){ alert("Cart is empty!"); return; }

  const name = e.target[0].value;
  const address = e.target[1].value;
  const subtotal = cart.reduce((sum, item)=>sum+item.price,0);
  const grandTotal = subtotal + SHIPPING;

  const orders = JSON.parse(localStorage.getItem('orders')||'[]');
  orders.push({customer:name, address, items:[...cart], subtotal, shipping:SHIPPING, grandTotal, date:new Date().toLocaleString()});
  localStorage.setItem('orders', JSON.stringify(orders));

  alert(`Order placed!\nGrand Total: ₱${grandTotal}`);
  cart = [];
  displayCart();
  e.target.reset();
}
