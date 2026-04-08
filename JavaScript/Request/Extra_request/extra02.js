const usuario = JSON.parse(localStorage.getItem("usuario"))

if (usuario === null) {
    window.location.href = "extra02.html"
}

const contenido = document.getElementById("contenido")
const btnEditar = document.getElementById("btn-editar")
const btnGuardar = document.getElementById("btn-guardar")
const btnLogout = document.getElementById("btn-logout")
const formulario = document.getElementById("formulario")
const inputNombre = document.getElementById("input-nombre")
const inputDireccion = document.getElementById("input-direccion")


contenido.innerHTML = `
    <div>
        <h2>Datos del usuario</h2>
        <p><strong>Nombre:</strong> ${usuario.name}</p>
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Correo:</strong> ${usuario.data.correo}</p>
        <p><strong>Dirección:</strong> ${usuario.data.direccion}</p>
    </div>
`