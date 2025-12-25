function getCart() {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function renderCart() {
  const cart = getCart();
  const tbody = document.querySelector("#cart-table tbody");
  const totalEl = document.getElementById("cart-total");
  tbody.innerHTML = "";

  let total = 0;
  cart.forEach(item => {
    const subtotal = item.price * item.quantity;
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>₹${item.price}</td>
      <td>${item.quantity}</td>
      <td>₹${subtotal}</td>
    `;
    tbody.appendChild(row);
  });

  totalEl.textContent = `Total: ₹${total}`;
}

document.addEventListener("DOMContentLoaded", renderCart);