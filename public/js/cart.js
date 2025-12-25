function getCart() {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

function updateFavCount() {
  const data = localStorage.getItem("favourites");
  try {
    const favs = JSON.parse(data);
    const valid = Array.isArray(favs) ? favs.filter(f => typeof f === "string" && f.length > 0) : [];
    const el = document.getElementById("fav-count");
    if (el) el.textContent = valid.length;
  } catch {
    if (document.getElementById("fav-count")) document.getElementById("fav-count").textContent = "0";
  }
}

function renderCart() {
  const cart = getCart();
  const container = document.getElementById("cart-container");
  container.innerHTML = "";

  let subtotal = 0;

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      subtotal += itemSubtotal;

      const card = document.createElement("div");
      card.className = "cart-item";
      card.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-details">
          <div class="name">${item.name}</div>
          <div class="item-id">Item: ${item.id}</div>
          <div class="quantity">Quantity: ${item.quantity}</div>
        </div>
      `;
      container.appendChild(card);
    });
  }

  const shipping = cart.length > 0 ? 100 : 0;
  const total = subtotal + shipping;

  document.getElementById("subtotal").textContent = subtotal;
  document.getElementById("shipping").textContent = shipping;
  document.getElementById("total").textContent = total;
}

function goToPlaceOrder() {
  window.location.href = "place-order.html";
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateFavCount();
  renderCart();
});