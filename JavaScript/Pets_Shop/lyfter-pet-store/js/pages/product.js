document.addEventListener("DOMContentLoaded", async () => {
  setupNavbar();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectTo("index.html");
    });
  }

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    showState("error");
    return;
  }

  await loadProduct(productId);
});

async function loadProduct(productId) {
  try {
    const product = await getProductById(productId);
    renderProduct(product);
  } catch (error) {
    showState("error");
  }
}

function renderProduct(product) {
  document.getElementById("product-image").src =
    product.image_url || "https://placehold.co/600x400?text=Sin+imagen";
  document.getElementById("product-category").textContent =
    product.category || "General";
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent =
    `₡${Number(product.price).toLocaleString()}`;
  document.getElementById("product-description").textContent =
    product.description || "Sin descripción disponible.";
  document.getElementById("product-stock").textContent =
    `Stock disponible: ${product.stock} unidades`;

  const btnAddCart = document.getElementById("btn-add-cart");

  if (isLoggedIn() && getUserRole() === "cliente") {
    btnAddCart.style.display = "block";
    btnAddCart.addEventListener("click", () =>
      handleAddToCart(product.id, product.name, product.price)
    );
  } else {
    btnAddCart.style.display = "none";
  }

  showState("detail");
}

async function handleAddToCart(productId, productName, price) {
  hideError("product-error");

  try {
    let cartId = localStorage.getItem("cart_id");

    if (!cartId) {
      const cartResponse = await createCart();
      cartId = cartResponse.id;
      localStorage.setItem("cart_id", cartId);
    }

    await addItemToCart(cartId, productId, 1, price);
    showSuccess("product-success", `✅ "${productName}" agregado al carrito`);

    setTimeout(() => hideError("product-success"), 3000);

  } catch (error) {
    showError("product-error", "Error al agregar al carrito. Intentalo de nuevo.");
  }
}

function showState(state) {
  const loadingState = document.getElementById("loading-state");
  const productDetail = document.getElementById("product-detail");
  const errorState = document.getElementById("error-state");

  loadingState.style.display = "none";
  productDetail.style.display = "none";
  errorState.style.display = "none";

  if (state === "loading") loadingState.style.display = "flex";
  if (state === "detail") productDetail.style.display = "grid";
  if (state === "error") errorState.style.display = "flex";
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
    if (getUserRole() === "admin" && navAdmin) navAdmin.style.display = "list-item";
    if (getUserRole() === "cliente" && navCart) navCart.style.display = "list-item";
  } else {
    if (navLogin) navLogin.style.display = "list-item";
    if (navLogout) navLogout.style.display = "none";
    if (navUser) navUser.style.display = "none";
    if (navAdmin) navAdmin.style.display = "none";
    if (navCart) navCart.style.display = "none";
  }
}