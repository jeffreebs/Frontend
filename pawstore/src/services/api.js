const API_URL = import.meta.env.VITE_API_URL

export const getProducts = async () => {
  const res = await fetch(`${API_URL}/products`)
  return res.json()
}

export const getProductById = async (id) => {
  const res = await fetch(`${API_URL}/products/${id}`)
  return res.json()
}

export const login = async (form) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(form)
  })
  return { data: await res.json(), ok: res.ok }
}

export const createProduct = async (producto, token) => {
  const res = await fetch(`${API_URL}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(producto)
  })
  return { data: await res.json(), ok: res.ok }
}

export const updateProduct = async (id, producto, token) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(producto)
  })
  return { ok: res.ok }
}

export const deleteProduct = async (id, token) => {
  const res = await fetch(`${API_URL}/products/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  return { ok: res.ok }
}

export const createCart = async (userId, token) => {
  const res = await fetch(`${API_URL}/carts`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify({ user_id: userId })
  })
  return { data: await res.json(), ok: res.ok }
}

export const addCartItem = async (cartId, item, token) => {
  const res = await fetch(`${API_URL}/carts/${cartId}/items`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(item)
  })
  return { ok: res.ok }
}

export const checkout = async (payload, token) => {
  const res = await fetch(`${API_URL}/checkout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
    body: JSON.stringify(payload)
  })
  return { ok: res.ok }
}