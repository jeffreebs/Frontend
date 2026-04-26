document.addEventListener("DOMContentLoaded", () => {
  if (isLoggedIn()) {
    redirectTo("catalog.html");
    return;
  }

  const btnRegister = document.getElementById("btn-register");
  btnRegister.addEventListener("click", handleRegister);
});

async function handleRegister() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirm-password").value.trim();

  hideError("register-error");
  hideError("register-success");

  if (!isValidName(name)) {
    showError("register-error", "El nombre debe tener al menos 3 caracteres.");
    return;
  }

  if (!isValidEmail(email)) {
    showError("register-error", "Por favor ingresá un correo electrónico válido.");
    return;
  }

  if (!isValidPassword(password)) {
    showError("register-error", "La contraseña debe tener al menos 8 caracteres.");
    return;
  }

  if (password !== confirmPassword) {
    showError("register-error", "Las contraseñas no coinciden.");
    return;
  }

  setLoading("btn-register", true);

  try {
    await registerUser(name, email, password);
    showSuccess("register-success", "¡Cuenta creada exitosamente! Redirigiendo...");

    setTimeout(() => {
      redirectTo("login.html");
    }, 2000);

  } catch (error) {
    showError("register-error", "Error al crear la cuenta. El correo ya puede estar registrado.");
  } finally {
    setLoading("btn-register", false);
  }
}