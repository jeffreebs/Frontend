document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) {
    redirectTo("catalog.html");
    return;
  }

  const btnLogin = document.getElementById("btn-login");
  btnLogin.addEventListener("click", handleLogin);
});

async function handleLogin() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  hideError("login-error");

  if (!isValidEmail(email)) {
    showError("login-error", "Por favor ingresá un correo electrónico válido.");
    return;
  }

  if (!isValidPassword(password)) {
    showError("login-error", "La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  setLoading("btn-login", true);

  try {
    const response = await loginUser(email, password);
    const token = response.token;
    const userId = response.user_id;

    saveSession(token, userId, "cliente");

    const role = await detectUserRole();
    saveSession(token, userId, role);

    if (role === "admin") {
      redirectTo("admin.html");
    } else {
      redirectTo("catalog.html");
    }

  } catch (error) {
    showError("login-error", "Credenciales incorrectas. Intentalo de nuevo.");
  } finally {
    setLoading("btn-login", false);
  }
}