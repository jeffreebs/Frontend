async function getPokemon() {
    const [p1,p2,p3]= await Promise.all([
        fetch("https://pokeapi.co/api/v2/pokemon/1").then(r=>r.json()),
        fetch("https://pokeapi.co/api/v2/pokemon/4").then(r=>r.json()),
        fetch("https://pokeapi.co/api/v2/pokemon/7").then(r =>r.json()),
    ]);

    console.log(p1.name,p2.name,p3.name);

    
}

getPokemon();