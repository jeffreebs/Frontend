document.addEventListener("DOMContentLoaded", async () => {
  guardSession();
  setupNavbar();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectTo("index.html");
    });
  }

  const btnCheckout = document.getElementById("btn-checkout");
  if (btnCheckout) {
    btnCheckout.addEventListener("click", () => {
      redirectTo("checkout.html");
    });
  }

  await loadCart();
});

async function loadCart() {
  const cartId = localStorage.getItem("cart_id");

  if (!cartId) {
    showEmptyCart();
    return;
  }

  try {
    const cart = await getCart(cartId);

    if (!cart.items || cart.items.length === 0) {
      showEmptyCart();
      return;
    }

    localStorage.setItem("cart_items", JSON.stringify(cart.items));
    renderCart(cart.items);

  } catch (error) {
    showEmptyCart();
  }
}

function renderCart(items) {
  const cartContent = document.getElementById("cart-content");
  const emptyCart = document.getElementById("empty-cart");
  const cartItemsContainer = document.getElementById("cart-items");

  emptyCart.style.display = "none";
  cartContent.style.display = "block";
  cartItemsContainer.innerHTML = "";

  let total = 0;

  items.forEach((item) => {
    total += Number(item.price) * item.quantity;
    const itemEl = createCartItem(item);
    cartItemsContainer.appendChild(itemEl);
  });

  document.getElementById("cart-total").textContent =
    `₡${total.toLocaleString()}`;
}

function createCartItem(item) {
  const div = document.createElement("div");
  div.className = "card";
  div.style.cssText = "padding:1rem; margin-bottom:1rem; display:flex; align-items:center; gap:1rem;";

  div.innerHTML = `
    <img
      src="${item.image_url || 'https://placehold.co/80x80?text=img'}"
      alt="${item.name}"
      style="width:5rem; height:5rem; object-fit:cover; border-radius:0.5rem;"
      onerror="this.src='https://placehold.co/80x80?text=img'"
    />
    <div style="flex:1;">
      <p style="font-weight:600; margin-bottom:0.25rem;">${item.name}</p>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        Precio: ₡${Number(item.price).toLocaleString()}
      </p>
      <p style="color:var(--text-muted); font-size:0.85rem;">
        Subtotal: ₡${(Number(item.price) * item.quantity).toLocaleString()}
      </p>
    </div>
    <div style="display:flex; align-items:center; gap:0.5rem;">
      <button
        class="btn btn--outline"
        style="width:2rem; height:2rem; padding:0; display:flex; align-items:center; justify-content:center;"
        onclick="handleUpdateItem(${item.id}, ${item.quantity - 1})"
      >−</button>
      <span style="font-weight:600; min-width:1.5rem; text-align:center;">${item.quantity}</span>
      <button
        class="btn btn--outline"
        style="width:2rem; height:2rem; padding:0; display:flex; align-items:center; justify-content:center;"
        onclick="handleUpdateItem(${item.id}, ${item.quantity + 1})"
      >+</button>
    </div>
    <button
      class="btn btn--danger"
      style="width:auto; padding:0.5rem 0.85rem; font-size:0.85rem;"
      onclick="handleRemoveItem(${item.id})"
    >
      Eliminar
    </button>
  `;

  return div;
}

async function handleUpdateItem(itemId, newQuantity) {
  const cartId = localStorage.getItem("cart_id");

  if (newQuantity <= 0) {
    await handleRemoveItem(itemId);
    return;
  }

  try {
    await updateCartItem(cartId, itemId, newQuantity);
    await loadCart();
  } catch (error) {
    showError("cart-error", "Error al actualizar el item.");
  }
}

async function handleRemoveItem(itemId) {
  const cartId = localStorage.getItem("cart_id");

  try {
    await removeCartItem(cartId, itemId);
    await loadCart();
  } catch (error) {
    showError("cart-error", "Error al eliminar el item.");
  }
}

function showEmptyCart() {
  const cartContent = document.getElementById("cart-content");
  const emptyCart = document.getElementById("empty-cart");
  cartContent.style.display = "none";
  emptyCart.style.display = "flex";
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