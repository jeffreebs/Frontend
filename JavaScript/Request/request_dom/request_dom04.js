const btnCambiar = document.getElementById ("btn-cambiar")
const inputId = document.getElementById("userId")
const inputAnterior = document.getElementById("passwordAnterior")
const inputNueva = document.getElementById("passwordNueva")
const inputConfirm = document.getElementById ("passwordConfirm")
const mensaje = document.getElementById ("mensaje")


btnCambiar.addEventListener("click", async function() {
    const userId = inputId.value.trim()
    const passwordAnterior = inputAnterior.value.trim()
    const passwordNueva = inputNueva.value.trim()
    const passwordConfirm = inputConfirm.value.trim()

    const usuario = await getUser(userId)

    if (usuario === null) {
        mensaje.textContent = "Por favor digite un usuario"
        return
    }

    if (usuario.data.contrasena !== passwordAnterior) {
        mensaje.textContent = "Su contraseña no coincide"
        return
    }

    if (passwordNueva !== passwordConfirm) {
        mensaje.textContent = "No coincide"
        return
    }

    
const response = await fetch(`https://api.restful-api.dev/objects/${userId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        data: { contrasena: passwordNueva }
    })
})

const data = await response.json()
mensaje.textContent = "Constraseña actualizada"


})
async function getUser(id) {
    try {
        const response = await fetch(`https://api.restful-api.dev/objects/${id}`)
        if (!response.ok) return null
        const data = await response.json()
        return data
    } catch (error) {
        return null
    }
}