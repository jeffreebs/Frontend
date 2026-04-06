const axios = require ("axios")

async function getUser (id){
    try{
        const response = await axios.get (`https://api.restful-api.dev/objects/${id}`);
        const data = response.data
            console.log(data)
    } catch (error) {
        console.log(`Error: usuario con id ${id} no encontrado`)
    }
            
}
    

getUser(1) 
getUser(99) 


   