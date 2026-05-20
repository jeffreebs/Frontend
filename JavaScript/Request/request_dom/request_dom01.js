const btnRegistro = document.getElementById("btn-registro")
const inputNombre = document.getElementById("nombre")
const inputEmail = document.getElementById("email")
const inputPassword = document.getElementById("password")
const inputDireccion = document.getElementById("direccion")
const mensaje = document.getElementById("mensaje")


btnRegistro.addEventListener("click", async function() {
    const nombre = inputNombre.value
    const email = inputEmail.value
    const password = inputPassword.value
    const direccion = inputDireccion.value

    const usuario = await crearUsuario(nombre, email, password, direccion)
    const usuarioCompleto = {
    id: usuario.id,
    name: nombre,
    data: {
        correo: email,
        contrasena: password,
        direccion: direccion
    }
}
    alert(`Usuario creado correctamente! Tu id es ${usuario.id}`)
    localStorage.setItem("usuario", JSON.stringify(usuarioCompleto))
    window.location.href = "request_dom03.html"
})

async function crearUsuario(nombre, correo, contrasena, direccion) {
    const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nombre,
            data: { correo, contrasena, direccion }
        })
    })
    const data = await response.json()
    return data  
}

  