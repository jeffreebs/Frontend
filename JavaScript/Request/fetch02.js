async function crearUsuario(nombre, correo, contrasena, direccion) {
    const response = await fetch("https://api.restful-api.dev/objects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: nombre,
            data: {
                correo: correo,
                contrasena: contrasena,
                direccion: direccion
            }
        })
    })

    const data = await response.json()
    console.log(data)
}

crearUsuario("Jeff", "jeff@gmail.com", "1234", "San José")