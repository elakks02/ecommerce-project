const API_BASE = "http://localhost:3000";

// -------------------- CART --------------------
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

async function addToCartById(id) {
  try {
    const res = await fetch(`${API_BASE}/api/products/${id}`);
    if (!res.ok) throw new Error("Product not found");
    const product = await res.json();

    const cart = getCart();
    const existing = cart.find(item => item.id === product._id);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }

    setCart(cart);
    updateCartCount();
    alert("Added to cart");
  } catch (err) {
    console.error(err);
    alert("Could not add to cart");
  }
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

function toggleFavourite(id, el) {
  let favs = getFavourites().filter(f => f);
  if (favs.includes(id)) {
    favs = favs.filter(f => f !== id);
    el.classList.remove("liked");
  } else {
    favs.push(id);
    el.classList.add("liked");
  }
  setFavourites(favs);
  updateFavCount();
}

// -------------------- RENDER PRODUCTS --------------------
function renderProducts(products) {
  const container = document.getElementById("products-container");
  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-body">
        <div class="product-name">${product.name}</div>
        <div class="product-price">₹${product.price}</div>
        <div class="product-category">${product.category}</div>
        <div class="product-actions">
          <button class="btn-add-cart" onclick="addToCartById('${product._id}')">Add to Cart</button>
          <span class="heart" onclick="toggleFavourite('${product._id}', this)">♥</span>
        </div>
      </div>
    `;
    container.appendChild(card);
  });
}

// -------------------- LOAD PRODUCTS --------------------
async function loadProducts(category = "all", keyword = "") {
  try {
    const res = await fetch(`${API_BASE}/api/products`);
    if (!res.ok) throw new Error("Failed to load products");
    let products = await res.json();

    if (category !== "all") {
  products = products.filter(p =>
    p.category.trim().toLowerCase() === category.trim().toLowerCase()
  );
}
    if (keyword.trim()) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    renderProducts(products);
  } catch (err) {
    console.error(err);
    document.getElementById("products-container").innerHTML =
      "<p>Could not load products.</p>";
  }
}

// -------------------- SEARCH HANDLER --------------------
function setupSearch() {
  const searchBtn = document.getElementById("search-btn");
  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-select");

  searchBtn.addEventListener("click", () => {
    const keyword = searchInput.value;
    const category = categorySelect.value;
    loadProducts(category, keyword);
  });
}

// -------------------- INIT --------------------
document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  updateFavCount();
  setupSearch();
  loadProducts(); // load all products by default
});