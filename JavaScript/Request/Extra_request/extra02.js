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

btnEditar.addEventListener("click", function () {
    inputNombre.value = usuario.name
    inputDireccion.value = usuario.data.direccion

    formulario.style.display = "block"
})

btnGuardar.addEventListener("click", async function () {
    const nuevoNombre = inputNombre.value.trim()
    const nuevaDireccion = inputDireccion.value.trim()

    try {
        const response = await fetch(`https://api.restful-api.dev/objects/${usuario.id}`,{
            method : "PATCH",
            headers : {"Content-Type": "application/json"},
            body: JSON.stringify({
                name:nuevoNombre,
                data: {
                    correo:usuario.data.correo,
                    contrasena: usuario.data.contrasena,
                    direccion: nuevaDireccion
                }
           })
    
})

if (!response.ok){
    contenido.innerHTML += `<p style="color:red">Error al actualizar</p>`
    return
}

usuario.name = nuevoNombre
usuario.data.direccion = nuevaDireccion
localStorage.setItem("usuario",JSON.stringify(usuario))

contenido.innerHTML = `
            <div>
                <h2>Datos del usuario</h2>
                <p><strong>Nombre:</strong> ${usuario.name}</p>
                <p><strong>ID:</strong> ${usuario.id}</p>
                <p><strong>Correo:</strong> ${usuario.data.correo}</p>
                <p><strong>Dirección:</strong> ${usuario.data.direccion}</p>
                <p style="color:green">✓ Datos actualizados correctamente</p>
            </div>
        `

        formulario.style.display = "none"

    } catch(error){
        contenido.innerHTML += `<p style="color:red">Error de red: ${error.message}</p>`
    }

})

btnLogout.addEventListener("click", function(){
    localStorage.removeItem("usuario")
    window.location.href = "request_dom02.html"
})