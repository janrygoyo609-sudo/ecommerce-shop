let cart = [];
let total = 0;

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  displayCart();
}

function displayCart() {
  let cartDiv = document.getElementById("cart");
  cartDiv.innerHTML = "";
  cart.forEach(item => {
    cartDiv.innerHTML += `<p>${item.name} - ₱${item.price}</p>`;
  });
  document.getElementById("total").innerText = total;
}

function sendOrder(e) {
  e.preventDefault();
  alert(
    "Order received!\nTotal: ₱" + total +
    "\nPlease pay via GCash and send screenshot."
  );
}