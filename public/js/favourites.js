const API_BASE = "http://localhost:3000";

// -------------------- CART --------------------
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

// -------------------- FAVOURITES --------------------
function getFavourites() {
  const data = localStorage.getItem("favourites");
  try {
    const favs = JSON.parse(data);
    return Array.isArray(favs)
      ? favs.filter(f => typeof f === "string" && f.length > 0)
      : [];
  } catch {
    return [];
  }
}

function setFavourites(favs) {
  localStorage.setItem("favourites", JSON.stringify(favs));
}

function updateFavCount() {
  const favs = getFavourites();
  const el = document.getElementById("fav-count");
  if (el) el.textContent = favs.length;
}

// -------------------- REMOVE FROM FAVOURITES --------------------
function removeFavourite(id) {
  let favs = getFavourites();
  favs = favs.filter(f => f !== id);
  setFavourites(favs);
  updateFavCount();
  renderFavourites(); // re-render after removal
}

// -------------------- RENDER FAVOURITES --------------------
async function renderFavourites() {
  const favs = getFavourites();
  const container = document.getElementById("favourites-container");
  container.innerHTML = "";

  if (favs.length === 0) {
    container.innerHTML = "<p>No favourites yet.</p>";
    return;
  }

  for (const id of favs) {
    try {
      const res = await fetch(`${API_BASE}/api/products/${id}`);
      if (!res.ok) continue;
      const product = await res.json();

      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <div class="product-body">
          <div class="product-name">${product.name}</div>
          <div class="product-price">₹${product.price}</div>
          <div class="product-category">${product.category}</div>
          <button class="btn-remove" onclick="removeFavourite('${product._id}')">Remove from Favourites</button>
        </div>
      `;
      container.appendChild(card);
    } catch (err) {
      console.error("Error loading favourite product:", err);
    }
  }
}

// -------------------- INIT --------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();   // ✅ show cart count in header
  updateFavCount();    // ✅ show favourites count in header
  renderFavourites();  // ✅ render favourites grid
});