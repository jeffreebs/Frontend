

console.log("1. Enviando request");

fetch("https://jsonplaceholder.typicode.com/users/23")
    .then(response => {
        if (!response.ok) {
            throw new Error("Usuario no encontrado");
        }
        return response.json();
    })
    .then(data => console.log(data))
    .catch(error => console.log(`3. Hubo un problema: ${error}`))
    .finally(() => console.log("5. Codigo llegado al final"));


