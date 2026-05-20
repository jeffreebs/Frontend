const userId = 1;

console.log("1. Enviando request");

async function getUser() {
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/23`);
        console.log("2. Response recibido");
        const data = await response.json();
        console.log(data);
        console.log("4. Await terminado");
        console.log("5. Codigo llegado al final");
    } catch (error) {
        console.log(`3. Hubo un problema: ${error}`);
    }
}


getUser();

        