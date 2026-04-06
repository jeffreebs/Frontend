const btnlogin = document.getElementById("btn-login")
const inputId = document.getElementById("userId")
const inputPassword = document.getElementById("password")



btnlogin.addEventListener("click", async function() {
    const userId = inputId.value.trim()
    const password = inputPassword.value

    const usuario = await getUser(userId)  

    if (usuario === null) {
        mensaje.textContent = "Usuario no encontrado"
            return 
    }

    if (usuario.data.contrasena !== password) {
        mensaje.textContent = "Contraseña incorrecta"
        return  
    }

    localStorage.setItem("usuario", JSON.stringify(usuario))
    mensaje.textContent = `Bienvenido ${usuario.name}!`

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

