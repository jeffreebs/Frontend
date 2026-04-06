const usuario = JSON.parse (localStorage.getItem("usuario"))

if (usuario === null) {
    window.location.href = "request_dom03.html"
}


const contenido = document.getElementById("contenido")
const btnLogout = document.getElementById("btn-logout")

contenido.innerHTML = `
    <div>
        <h2>Datos del usuario</h2>
        <p><strong>Nombre:</strong> ${usuario.name}</p>
        <p><strong>ID:</strong> ${usuario.id}</p>
        <p><strong>Correo:</strong> ${usuario.data.correo}</p>
        <p><strong>Dirección:</strong> ${usuario.data.direccion}</p>
    </div>
`

btnLogout.addEventListener("click",function(){
    localStorage.removeItem("usuario")

    window.location.href = "request_dom03.html"
})