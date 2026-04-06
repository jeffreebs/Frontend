async function actualizarDireccion(id, nuevaDireccion) {
    const response = await fetch(`https://api.restful-api.dev/objects/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({
            
            data: { direccion: nuevaDireccion }
        })
    })

    const data = await response.json()
    console.log(data)
}

actualizarDireccion("ff8081819d150699019d35e3b5bf3e18", "Cartago, Costa Rica")