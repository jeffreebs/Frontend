async function getProducts() {
  const response = await apiFetch("/products");
  return response.data;
}

async function getProductById(productId) {
  const response = await apiFetch(`/products/${productId}`);
  return response.data;
}

async function createProduct(productData) {
  return await apiFetch("/products", {
    method: "POST",
    body: JSON.stringify(productData),
  });
}

async function updateProduct(productId, productData) {
  return await apiFetch(`/products/${productId}`, {
    method: "PUT",
    body: JSON.stringify(productData),
  });
}

async function deleteProduct(productId) {
  return await apiFetch(`/products/${productId}`, {
    method: "DELETE",
  });
}