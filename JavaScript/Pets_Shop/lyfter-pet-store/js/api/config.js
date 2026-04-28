const API_URL = "http://localhost:5000";
const USE_MOCK = true; // 👈 cambiá a false cuando el backend esté listo

async function apiFetch(endpoint, options = {}) {
  if (USE_MOCK) {
    return handleMock(endpoint, options);
  }

  const token = getToken();

  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error en la solicitud");
  }

  return data;
}

function handleMock(endpoint, options = {}) {
  const method = options.method || "GET";
  const body = options.body ? JSON.parse(options.body) : {};

  // POST /login
  if (endpoint === "/login" && method === "POST") {
    const { email, password } = body;
    const admin = MOCK_USERS.admin;
    const cliente = MOCK_USERS.cliente;

    if (email === admin.email && password === admin.password) {
      return { token: "mock-token-admin", user_id: admin.id, message: "ok" };
    }
    if (email === cliente.email && password === cliente.password) {
      return { token: "mock-token-cliente", user_id: cliente.id, message: "ok" };
    }
    throw new Error("Credenciales incorrectas");
  }

  // POST /register
  if (endpoint === "/register" && method === "POST") {
    return { message: "Successfully registered" };
  }

  // GET /bills (detectar rol admin)
  if (endpoint === "/bills" && method === "GET") {
    const token = getToken();
    if (token === "mock-token-admin") {
      return { data: [
        { id: 1, total: 45000 },
        { id: 2, total: 32000 },
        { id: 3, total: 18500 },
      ]};
    }
    throw new Error("Access denied");
  }

  // GET /products
  if (endpoint === "/products" && method === "GET") {
    return { source: "mock", data: MOCK_PRODUCTS };
  }

  // GET /products/:id
  if (endpoint.startsWith("/products/") && method === "GET") {
    const id = Number(endpoint.split("/")[2]);
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return { source: "mock", data: product };
  }

  // POST /products
  if (endpoint === "/products" && method === "POST") {
    const newProduct = { ...body, id: MOCK_PRODUCTS.length + 1 };
    MOCK_PRODUCTS.push(newProduct);
    return { message: "Product created" };
  }

  // PUT /products/:id
  if (endpoint.startsWith("/products/") && method === "PUT") {
    const id = Number(endpoint.split("/")[2]);
    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");
    MOCK_PRODUCTS[index] = { ...MOCK_PRODUCTS[index], ...body };
    return { message: "Product updated" };
  }

  // DELETE /products/:id
  if (endpoint.startsWith("/products/") && method === "DELETE") {
    const id = Number(endpoint.split("/")[2]);
    const index = MOCK_PRODUCTS.findIndex((p) => p.id === id);
    if (index === -1) throw new Error("Product not found");
    MOCK_PRODUCTS.splice(index, 1);
    return { message: "Product deleted" };
  }

  // POST /carts
  if (endpoint === "/carts" && method === "POST") {
    return { id: 1, status: "active" };
  }

  // GET /carts/:id
  if (endpoint.startsWith("/carts/") && !endpoint.includes("/items") && method === "GET") {
    const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
    return { id: 1, items: cartItems };
  }

  // POST /carts/:id/items
  if (endpoint.includes("/items") && method === "POST") {
    const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
    const product = MOCK_PRODUCTS.find((p) => p.id === body.product_id);
    const existingIndex = cartItems.findIndex((i) => i.product_id === body.product_id);

    if (existingIndex >= 0) {
      cartItems[existingIndex].quantity += body.quantity;
    } else {
      cartItems.push({
        id: Date.now(),
        product_id: body.product_id,
        name: product?.name || "Producto",
        price: body.price,
        quantity: body.quantity,
        image_url: product?.image_url || "",
      });
    }

    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    return { message: "Item added" };
  }

  // PUT /carts/:id/items/:itemId
  if (endpoint.includes("/items/") && method === "PUT") {
    const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
    const itemId = Number(endpoint.split("/").pop());
    const index = cartItems.findIndex((i) => i.id === itemId);
    if (index >= 0) cartItems[index].quantity = body.quantity;
    localStorage.setItem("cart_items", JSON.stringify(cartItems));
    return { message: "Item updated" };
  }

  // DELETE /carts/:id/items/:itemId
  if (endpoint.includes("/items/") && method === "DELETE") {
    const cartItems = JSON.parse(localStorage.getItem("cart_items") || "[]");
    const itemId = Number(endpoint.split("/").pop());
    const filtered = cartItems.filter((i) => i.id !== itemId);
    localStorage.setItem("cart_items", JSON.stringify(filtered));
    return { message: "Item removed" };
  }

  // POST /checkout
  if (endpoint === "/checkout" && method === "POST") {
    return { message: "Checkout successful" };
  }

  throw new Error(`Mock: endpoint no manejado → ${method} ${endpoint}`);
}