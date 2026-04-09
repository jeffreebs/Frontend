fetch("https://jsonplaceholder.typicode.com/users/2")
    .then(response =>response.json())
    .then(data =>{
        console.log(data.name);
        return fetch ("https://jsonplaceholder.typicode.com/users/3");
    })

    .then(response => response.json())
    .then (data => {
        console.log(data.name);
        return fetch("https://jsonplaceholder.typicode.com/users/4");
    })

    .then(response => response.json())
    .then(data => console.log(data.name))
    .catch(error => console.log(`Error: ${error.message}`))