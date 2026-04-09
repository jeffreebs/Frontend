const axios = require ("axios")

async function actualizarDireccion(id, nuevaDireccion) {
    const response = await axios.patch(`https://api.restful-api.dev/objects/${id}`, {
            data: { direccion: nuevaDireccion }
        
    })

    const data = response.data
    console.log(data)
}

actualizarDireccion("ff8081819d150699019d35e3b5bf3e18", "Cartago, Costa Rica")