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