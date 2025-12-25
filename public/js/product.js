const API_BASE = "http://localhost:3000";

function getCart() {
  const data = localStorage.getItem("cart");
  return data ? JSON.parse(data) : [];
}

function setCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
  const cart = getCart();
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById("cart-count");
  if (el) el.textContent = count;
}

function setYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id"); // keep string id (ObjectId)
}

async function loadProduct() {
  const id = getProductIdFromUrl();
  if (!id) return;

  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    const product = await res.json();

    const detailsEl = document.getElementById("product-details");
    detailsEl.innerHTML = `
      <div>
        <img src="${product.image}" alt="${product.name}">
      </div>
      <div>
        <h1>${product.name}</h1>
        <p class="category">Category: ${product.category || "General"}</p>
        <p>${product.description}</p>
        <p class="price">₹${Number(product.price).toFixed(0)}</p>
        <button id="add-to-cart" class="btn-primary">Add to Cart</button>
        <button id="back-btn" class="btn-secondary" style="margin-left: 0.5rem;">Back to Home</button>
      </div>
    `;

    document.getElementById("add-to-cart").addEventListener("click", () => {
  addToCart(product); // product is defined in this scope
});

    document.getElementById("back-btn").addEventListener("click", () => {
      window.location.href = "index.html";
    });
  } catch (error) {
    console.error(error);
    const detailsEl = document.getElementById("product-details");
    detailsEl.innerHTML = `<p>Product not found.</p>`;
  }
}

function addToCart(product) {
  const cart = getCart();
  const key = product._id || product.id; // prefer _id
  if (!key) {
    alert("Missing product id");
    return;
  }

  const existing = cart.find((item) => item.id === key);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({
      id: key,
      name: product.name,
      price: Number(product.price),
      image: product.image,
      quantity: 1
    });
  }

  setCart(cart);
  updateCartCount();
  alert("Added to cart");
}

document.addEventListener("DOMContentLoaded", () => {
  setYear();
  updateCartCount();
  loadProduct();
});