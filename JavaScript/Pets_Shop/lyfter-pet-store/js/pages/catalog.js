let allProducts = [];

document.addEventListener("DOMContentLoaded", async () => {
  setupNavbar();
  updateCartBadge();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectTo("index.html");
    });
  }

  const searchInput = document.getElementById("search-input");
  const categorySelect = document.getElementById("category-select");

  searchInput.addEventListener("input", filterProducts);
  categorySelect.addEventListener("change", filterProducts);

  await loadProducts();
});

async function loadProducts() {
  try {
    allProducts = await getProducts();
    populateCategories(allProducts);
    renderProducts(allProducts);
  } catch (error) {
    showEmptyState();
  }
}

function populateCategories(products) {
  const categorySelect = document.getElementById("category-select");
  const categories = [...new Set(products.map((p) => p.category).filter(Boolean))];

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function filterProducts() {
  const search = document.getElementById("search-input").value.toLowerCase();
  const category = document.getElementById("category-select").value;

  const filtered = allProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search);
    const matchesCategory = category === "" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  renderProducts(filtered);
}

function renderProducts(products) {
  const grid = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");

  grid.innerHTML = "";

  if (products.length === 0) {
    showEmptyState();
    return;
  }

  emptyState.style.display = "none";
  grid.style.display = "grid";

  products.forEach((product) => {
    const card = createProductCard(product);
    grid.appendChild(card);
  });
}

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  const isLowStock = product.stock <= 5;
  const stockClass = isLowStock ? "product-card__stock--low" : "product-card__stock";
  const stockText = isLowStock ? `⚠️ Solo ${product.stock} disponibles` : `Stock: ${product.stock}`;

  card.innerHTML = `
    <img
      class="product-card__image"
      src="${product.image_url || 'https://placehold.co/300x200?text=Sin+imagen'}"
      alt="${product.name}"
      onerror="this.src='https://placehold.co/300x200?text=Sin+imagen'"
    />
    <div class="product-card__body">
      <p class="product-card__category">${product.category || "General"}</p>
      <h3 class="product-card__name">${product.name}</h3>
      <p class="product-card__price">₡${Number(product.price).toLocaleString()}</p>
      <p class="${stockClass}">${stockText}</p>
    </div>
    <div class="product-card__footer">
      <button class="btn btn--outline" onclick="redirectTo('product.html?id=${product.id}')">
        Ver detalles
      </button>
      ${isLoggedIn() && getUserRole() === "cliente" ? `
        <button class="btn btn--primary" onclick="handleAddToCart(${product.id}, '${product.name}', ${product.price})">
          🛒 Agregar
        </button>
      ` : ""}
    </div>
  `;

  return card;
}

async function handleAddToCart(productId, productName, price) {
  if (!isLoggedIn()) {
    redirectTo("login.html");
    return;
  }

  try {
    let cartId = localStorage.getItem("cart_id");

    if (!cartId) {
      const cartResponse = await createCart();
      cartId = cartResponse.id;
      localStorage.setItem("cart_id", cartId);
    }

    await addItemToCart(cartId, productId, 1, price);
    updateCartBadge();
    alert(`✅ "${productName}" agregado al carrito`);

  } catch (error) {
    alert("❌ Error al agregar al carrito. Intentalo de nuevo.");
  }
}

function updateCartBadge() {
  const badge = document.getElementById("cart-badge");
  if (!badge) return;

  const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
  badge.textContent = cartItems.length;
}

function showEmptyState() {
  const grid = document.getElementById("products-grid");
  const emptyState = document.getElementById("empty-state");
  grid.style.display = "none";
  emptyState.style.display = "flex";
}

function setupNavbar() {
  const navLogin = document.getElementById("nav-login");
  const navLogout = document.getElementById("nav-logout");
  const navUser = document.getElementById("nav-user");
  const navAdmin = document.getElementById("nav-admin");
  const navCart = document.getElementById("nav-cart");
  const navUsername = document.getElementById("nav-username");

  if (isLoggedIn()) {
    if (navLogin) navLogin.style.display = "none";
    if (navLogout) navLogout.style.display = "list-item";
    if (navUser) navUser.style.display = "list-item";
    if (navUsername) navUsername.textContent = `Usuario: ${getUserRole()}`;

    if (getUserRole() === "admin") {
      if (navAdmin) navAdmin.style.display = "list-item";
    }

    if (getUserRole() === "cliente") {
      if (navCart) navCart.style.display = "list-item";
    }
  } else {
    if (navLogin) navLogin.style.display = "list-item";
    if (navLogout) navLogout.style.display = "none";
    if (navUser) navUser.style.display = "none";
    if (navAdmin) navAdmin.style.display = "none";
    if (navCart) navCart.style.display = "none";
  }
}