const axios = require ("axios")

async function crearUsuario(nombre, correo, contrasena, direccion) {
    const response = await axios.post("https://api.restful-api.dev/objects", {
            name: nombre,
            data: {
                correo: correo,
                contrasena: contrasena,
                direccion: direccion
            }
    })

    const data = response.data
    console.log(data)
}

crearUsuario("Jeff", "jeff@gmail.com", "1234", "San José")