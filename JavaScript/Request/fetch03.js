async function getUser (id){
    const response = await fetch ("https://api.restful-api.dev/objects/${id}");
        if (!response.ok){
            console.log(`Error: usuario con id ${id} no encontrado`)
            return
            
        }

        const data = await response.json()
        console.log(data)
    
    }
    

getUser(1) 
getUser(99) 


   