async function getObjects (){
    const response = await fetch ("https://api.restful-api.dev/objects");
    const data = await response.json();

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



