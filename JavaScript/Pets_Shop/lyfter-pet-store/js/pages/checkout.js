document.addEventListener("DOMContentLoaded", () => {
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

  const isConfirmationPage = document.getElementById("confirmation-items");

  if (isConfirmationPage) {
    renderConfirmation();
  } else {
    loadCheckoutItems();

    const btnConfirm = document.getElementById("btn-confirm");
    if (btnConfirm) {
      btnConfirm.addEventListener("click", handleCheckout);
    }
  }
});

function loadCheckoutItems() {
  const items = JSON.parse(localStorage.getItem("cart_items") || "[]");
  const container = document.getElementById("checkout-items");
  const totalEl = document.getElementById("checkout-total");

  if (!items.length) {
    redirectTo("cart.html");
    return;
  }

  let total = 0;
  container.innerHTML = "";

  items.forEach((item) => {
    const subtotal = Number(item.price) * Number(item.quantity);
    total += subtotal;

    const row = document.createElement("div");
    row.style.cssText = "display:flex; justify-content:space-between; margin-bottom:0.75rem; font-size:0.9rem;";
    row.innerHTML = `
      <span style="color:var(--text-muted);">
        ${item.name} x${item.quantity}
      </span>
      <span style="font-weight:600;">
        ₡${subtotal.toLocaleString()}
      </span>
    `;
    container.appendChild(row);
  });

  totalEl.textContent = `₡${total.toLocaleString()}`;
}

async function handleCheckout() {
  const billingName = document.getElementById("billing-name").value.trim();
  const billingAddress = document.getElementById("billing-address").value.trim();
  const billingTaxId = document.getElementById("billing-tax-id").value.trim();

  hideError("checkout-error");

  if (!isValidName(billingName)) {
    showError("checkout-error", "Por favor ingresá tu nombre completo.");
    return;
  }

  if (!isValidAddress(billingAddress)) {
    showError("checkout-error", "La dirección debe tener al menos 10 caracteres.");
    return;
  }

  if (!isValidTaxId(billingTaxId)) {
    showError("checkout-error", "Cédula inválida. Usá el formato 1-2345-6789 o 9 dígitos.");
    return;
  }

  const cartId = localStorage.getItem("cart_id");

  if (!cartId) {
    showError("checkout-error", "No se encontró el carrito. Volvé al catálogo.");
    return;
  }

  setLoading("btn-confirm", true);

  try {
    const billingInfo = {
      billing_name: billingName,
      billing_address: billingAddress,
      billing_tax_id: billingTaxId,
    };

    await checkout(cartId, billingInfo);

    const items = JSON.parse(localStorage.getItem("cart_items") || "[]");
    localStorage.setItem("last_order", JSON.stringify(items));

    localStorage.removeItem("cart_id");
    localStorage.removeItem("cart_items");

    redirectTo("confirmation.html");

  } catch (error) {
    showError("checkout-error", "Error al procesar la compra. Intentalo de nuevo.");
  } finally {
    setLoading("btn-confirm", false);
  }
}

function renderConfirmation() {
  const items = JSON.parse(localStorage.getItem("last_order") || "[]");
  const container = document.getElementById("confirmation-items");
  const totalEl = document.getElementById("confirmation-total");

  let total = 0;

  items.forEach((item) => {
    const subtotal = Number(item.price) * Number(item.quantity);
    total += subtotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td style="padding:0.65rem 1rem; border-bottom:0.0625rem solid var(--border);">
        ${item.name}
      </td>
      <td style="padding:0.65rem 1rem; border-bottom:0.0625rem solid var(--border); text-align:center;">
        ${item.quantity}
      </td>
      <td style="padding:0.65rem 1rem; border-bottom:0.0625rem solid var(--border); text-align:right;">
        ₡${subtotal.toLocaleString()}
      </td>
    `;
    container.appendChild(row);
  });

  totalEl.textContent = `₡${total.toLocaleString()}`;
}

function setupNavbar() {
  const navLogin = document.getElementById("nav-login");
  const navLogout = document.getElementById("nav-logout");
  const navUser = document.getElementById("nav-user");
  const navUsername = document.getElementById("nav-username");

  if (isLoggedIn()) {
    if (navLogin) navLogin.style.display = "none";
    if (navLogout) navLogout.style.display = "list-item";
    if (navUser) navUser.style.display = "list-item";
    if (navUsername) navUsername.textContent = `Usuario: ${getUserRole()}`;
  } else {
    if (navLogin) navLogin.style.display = "list-item";
    if (navLogout) navLogout.style.display = "none";
    if (navUser) navUser.style.display = "none";
  }
}