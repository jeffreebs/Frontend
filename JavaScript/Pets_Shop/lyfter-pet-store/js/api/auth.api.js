async function registerUser(name, email, password) {
  return await apiFetch("/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

async function loginUser(email, password) {
  return await apiFetch("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

async function detectUserRole() {
  try {
    await apiFetch("/bills");
    return "admin";
  } catch {
    return "cliente";
  }
}