const axios = require ("axios")

async function getObjects (){
    const response = await axios.get("https://api.restful-api.dev/objects");
    const data = response.data;

    for (const object of data){
        if (object["data"] !== null){
            const detalles = Object.entries(object.data)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ")
            console.log(`${object.name} (${detalles})`)
        }
    
    }
    
}
getObjects();



