async function getUser (id){
    const response = await fetch (`https://api.restful-api.dev/objects/${id}`);
    if (!response.ok){
        return(`Error: usuario con id ${id} no encontrado`)
    }

    const data = await response.json()
    return data
    
}

async function main () {
    const resultado1 = await getUser (1)
    if (resultado1.error){
        console.log(resultado1.error)
    }else {
        console.log(resultado1)
    }

    const resultado2 = await getUser(99)
    if (resultado2.error){
        console.log(resultado2.error)
    }else{
        console.log(resultado2)
    }
}
    

main()


   