function showError(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = "block";
  }
}

function hideError(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = "";
    element.style.display = "none";
  }
}

function showSuccess(elementId, message) {
  const element = document.getElementById(elementId);
  if (element) {
    element.textContent = message;
    element.style.display = "block";
  }
}

function setLoading(buttonId, isLoading) {
  const button = document.getElementById(buttonId);
  if (button) {
    button.disabled = isLoading;
    button.textContent = isLoading ? "Cargando..." : button.dataset.label;
  }
}

function redirectTo(page) {
  window.location.href = page;
}

function guardSession() {
  if (!isLoggedIn()) {
    redirectTo("login.html");
  }
}

function guardAdmin() {
  if (getUserRole() !== "admin") {
    redirectTo("catalog.html");
  }
}