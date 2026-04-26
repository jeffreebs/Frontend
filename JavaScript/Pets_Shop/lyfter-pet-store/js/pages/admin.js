document.addEventListener("DOMContentLoaded", async () => {
  guardSession();
  guardAdmin();
  setupNavbar();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectTo("index.html");
    });
  }

  const isEditPage = document.getElementById("edit-name");

  if (isEditPage) {
    await loadEditProduct();
  } else {
    await loadAdminPanel();
  }
});

// ===== PANEL ADMIN =====

async function loadAdminPanel() {
  try {
    const products = await getProducts();
    renderProductsTable(products);
    await loadStats(products);
  } catch (error) {
    showError("add-error", "Error al cargar los productos.");
  }

  const btnAddProduct = document.getElementById("btn-add-product");
  if (btnAddProduct) {
    btnAddProduct.addEventListener("click", handleAddProduct);
  }
}

async function loadStats(products) {
  document.getElementById("stat-products").textContent = products.length;

  try {
    const bills = await apiFetch("/bills");
    const billList = bills.data || bills;

    document.getElementById("stat-bills").textContent = billList.length;

    const revenue = billList.reduce((acc, bill) => acc + Number(bill.total), 0);
    document.getElementById("stat-revenue").textContent =
      `₡${revenue.toLocaleString()}`;
  } catch {
    document.getElementById("stat-bills").textContent = "0";
    document.getElementById("stat-revenue").textContent = "₡0";
  }
}

function renderProductsTable(products) {
  const tbody = document.getElementById("products-table-body");
  const tableEmpty = document.getElementById("table-empty");

  tbody.innerHTML = "";

  if (products.length === 0) {
    tableEmpty.style.display = "flex";
    return;
  }

  tableEmpty.style.display = "none";

  products.forEach((product) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>₡${Number(product.price).toLocaleString()}</td>
      <td>${product.category || "—"}</td>
      <td>${product.stock}</td>
      <td style="display:flex; gap:0.5rem;">
        <button
          class="btn btn--outline"
          onclick="redirectTo('edit-product.html?id=${product.id}')"
        >
          Editar
        </button>
        <button
          class="btn btn--danger"
          onclick="handleDeleteProduct(${product.id}, '${product.name}')"
        >
          Eliminar
        </button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

async function handleAddProduct() {
  const name = document.getElementById("add-name").value.trim();
  const description = document.getElementById("add-description").value.trim();
  const price = document.getElementById("add-price").value.trim();
  const category = document.getElementById("add-category").value.trim();
  const imageUrl = document.getElementById("add-image").value.trim();
  const stock = document.getElementById("add-stock").value.trim();
  const sku = document.getElementById("add-sku").value.trim();

  hideError("add-error");
  hideError("add-success");

  if (!isValidName(name)) {
    showError("add-error", "El nombre debe tener al menos 3 caracteres.");
    return;
  }

  if (!isValidPrice(price)) {
    showError("add-error", "El precio debe ser un número mayor a 0.");
    return;
  }

  if (!isValidStock(stock)) {
    showError("add-error", "El stock debe ser un número entero mayor o igual a 0.");
    return;
  }

  if (!sku) {
    showError("add-error", "El SKU es obligatorio.");
    return;
  }

  setLoading("btn-add-product", true);

  try {
    await createProduct({
      name,
      description,
      price: Number(price),
      category,
      image_url: imageUrl,
      stock: Number(stock),
      sku,
      is_active: true,
    });

    showSuccess("add-success", "✅ Producto agregado exitosamente.");
    clearAddForm();
    await loadAdminPanel();

  } catch (error) {
    showError("add-error", "Error al agregar el producto. Verificá los datos.");
  } finally {
    setLoading("btn-add-product", false);
  }
}

async function handleDeleteProduct(productId, productName) {
  const confirmed = confirm(`¿Seguro que querés eliminar "${productName}"?`);
  if (!confirmed) return;

  try {
    await deleteProduct(productId);
    await loadAdminPanel();
  } catch (error) {
    showError("add-error", "Error al eliminar el producto.");
  }
}

function clearAddForm() {
  document.getElementById("add-name").value = "";
  document.getElementById("add-description").value = "";
  document.getElementById("add-price").value = "";
  document.getElementById("add-category").value = "";
  document.getElementById("add-image").value = "";
  document.getElementById("add-stock").value = "";
  document.getElementById("add-sku").value = "";
}

// ===== EDITAR PRODUCTO =====

async function loadEditProduct() {
  guardAdmin();

  const params = new URLSearchParams(window.location.search);
  const productId = params.get("id");

  if (!productId) {
    redirectTo("admin.html");
    return;
  }

  try {
    const product = await getProductById(productId);
    prefillEditForm(product);
  } catch (error) {
    redirectTo("admin.html");
  }

  const btnSave = document.getElementById("btn-save");
  if (btnSave) {
    btnSave.addEventListener("click", () => handleSaveProduct(productId));
  }
}

function prefillEditForm(product) {
  document.getElementById("edit-name").value = product.name || "";
  document.getElementById("edit-description").value = product.description || "";
  document.getElementById("edit-price").value = product.price || "";
  document.getElementById("edit-category").value = product.category || "";
  document.getElementById("edit-image").value = product.image_url || "";
  document.getElementById("edit-stock").value = product.stock || "";
}

async function handleSaveProduct(productId) {
  const name = document.getElementById("edit-name").value.trim();
  const description = document.getElementById("edit-description").value.trim();
  const price = document.getElementById("edit-price").value.trim();
  const category = document.getElementById("edit-category").value.trim();
  const imageUrl = document.getElementById("edit-image").value.trim();
  const stock = document.getElementById("edit-stock").value.trim();

  hideError("edit-error");
  hideError("edit-success");

  if (!isValidName(name)) {
    showError("edit-error", "El nombre debe tener al menos 3 caracteres.");
    return;
  }

  if (!isValidPrice(price)) {
    showError("edit-error", "El precio debe ser un número mayor a 0.");
    return;
  }

  if (!isValidStock(stock)) {
    showError("edit-error", "El stock debe ser un número entero mayor o igual a 0.");
    return;
  }

  setLoading("btn-save", true);

  try {
    await updateProduct(productId, {
      name,
      description,
      price: Number(price),
      category,
      image_url: imageUrl,
      stock: Number(stock),
    });

    showSuccess("edit-success", "✅ Producto actualizado exitosamente.");

    setTimeout(() => {
      redirectTo("admin.html");
    }, 1500);

  } catch (error) {
    showError("edit-error", "Error al actualizar el producto.");
  } finally {
    setLoading("btn-save", false);
  }
}

function setupNavbar() {
  const navUser = document.getElementById("nav-user");
  const navUsername = document.getElementById("nav-username");

  if (navUser) navUser.style.display = "list-item";
  if (navUsername) navUsername.textContent = `Usuario: ${getUserRole()}`;
}