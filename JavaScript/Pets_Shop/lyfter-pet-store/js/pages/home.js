document.addEventListener("DOMContentLoaded", () => {
  setupNavbar();

  const btnLogout = document.getElementById("btn-logout");
  if (btnLogout) {
    btnLogout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      redirectTo("index.html");
    });
  }
});

function setupNavbar() {
  const navLogin = document.getElementById("nav-login");
  const navLogout = document.getElementById("nav-logout");
  const navUser = document.getElementById("nav-user");
  const navAdmin = document.getElementById("nav-admin");
  const navUsername = document.getElementById("nav-username");

  if (isLoggedIn()) {
    if (navLogin) navLogin.style.display = "none";
    if (navLogout) navLogout.style.display = "list-item";
    if (navUser) navUser.style.display = "list-item";
    if (navUsername) navUsername.textContent = `Usuario: ${getUserRole()}`;

    if (getUserRole() === "admin") {
      if (navAdmin) navAdmin.style.display = "list-item";
    }
  } else {
    if (navLogin) navLogin.style.display = "list-item";
    if (navLogout) navLogout.style.display = "none";
    if (navUser) navUser.style.display = "none";
    if (navAdmin) navAdmin.style.display = "none";
  }
}