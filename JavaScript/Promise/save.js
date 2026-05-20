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

function loadResource(name,time){
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log(`${name} cargado`);
            resolve(name);
        },time);
    })
}

async function loadSite(){
    await Promise.all([
        loadResource("image01.png",2000),
        loadResource("imagen02.png",3000),
        loadResource("imagn03.png",1000),
    ]);
    console.log("All images upload")

    await loadResource("script1.js",1000);
    await loadResource("script2.js",2000);
    console.log("All exersice upload");

    console.log("All site its allready");

}

loadSite();

function wait(seconds){
    return new Promise(resolve => {
        setTimeout(()=>{
            console.log(`Han pasado ${seconds} segundos`);
            resolve();    
        },seconds * 1000);
    });
}

async function run (){
    await wait(2);
    await wait(3);
    await wait(1);
}

run ();