async function createCart() {
  return await apiFetch("/carts", {
    method: "POST",
    body: JSON.stringify({ user_id: getUserId() }),
  });
}

async function getCart(cartId) {
  const response = await apiFetch(`/carts/${cartId}`);
  return response;
}

async function addItemToCart(cartId, productId, quantity, price) {
  return await apiFetch(`/carts/${cartId}/items`, {
    method: "POST",
    body: JSON.stringify({ product_id: productId, quantity, price }),
  });
}

async function updateCartItem(cartId, itemId, quantity) {
  return await apiFetch(`/carts/${cartId}/items/${itemId}`, {
    method: "PUT",
    body: JSON.stringify({ quantity }),
  });
}

async function removeCartItem(cartId, itemId) {
  return await apiFetch(`/carts/${cartId}/items/${itemId}`, {
    method: "DELETE",
  });
}

async function checkout(cartId, billingInfo) {
  return await apiFetch("/checkout", {
    method: "POST",
    body: JSON.stringify({
      cart_id: cartId,
      user_id: Number(getUserId()),
      billing_info: billingInfo,
    }),
  });
}