

const params = new URLSearchParams(window.location.search)
const mensajeExpirado = document.getElementById("mensaje-expirado")

if (params.get("expirado") === "true") {
    mensajeExpirado.style.display = "block"
}




const sesionGuardada = JSON.parse(localStorage.getItem("usuario"))

if (sesionGuardada !== null) {

    const ahora      = Date.now()
    const loginTime  = sesionGuardada.loginTime
    const diferencia = ahora - loginTime
    const minutos    = diferencia / 1000 / 60

    if (minutos < 5) {
        window.location.href = "extra02.html"
    } else {
        localStorage.removeItem("usuario")
    }
}


const inputNombre    = document.getElementById("input-nombre")
const inputCorreo    = document.getElementById("input-correo")
const inputDireccion = document.getElementById("input-direccion")
const btnLogin       = document.getElementById("btn-login")
const mensaje        = document.getElementById("mensaje")



btnLogin.addEventListener("click", async function () {

    btnLogin.disabled = true
    mensaje.style.color = "gray"
    mensaje.textContent = "Iniciando sesión..."

    const nombre    = inputNombre.value.trim()
    const correo    = inputCorreo.value.trim()
    const direccion = inputDireccion.value.trim()

    if (!nombre || !correo || !direccion) {
        mensaje.textContent = "Por favor completá todos los campos."
        mensaje.style.color = "red"
        btnLogin.disabled = false
        return
    }

    const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: nombre,
            data: {
                correo: correo,
                direccion: direccion
            }
        })
    })

    const usuarioCreado = await response.json()

    const sesion = {
        id:        usuarioCreado.id,
        name:      usuarioCreado.name,
        data:      usuarioCreado.data,
        loginTime: Date.now()    // ← timestamp del momento del login
    }

    localStorage.setItem("usuario", JSON.stringify(sesion))

    alert(`✅ Sesión iniciada. Tu ID es: ${usuarioCreado.id}`)

    window.location.href = "extra02.html"
})
