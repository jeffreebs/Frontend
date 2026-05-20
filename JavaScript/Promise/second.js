async function getPokemon() {
    try{
            const pokemon= await Promise.any([
            fetch("https://pokeapi.co/api/v2/pokemon/1").then(r=>r.json()),
            fetch("https://pokeapi.co/api/v2/pokemon/4").then(r=>r.json()),
            fetch("https://pokeapi.co/api/v2/pokemon/7").then(r =>r.json()),
        ]);

        console.log(pokemon.name);

    }catch(error)  {
    
    console.error("Todos los CDN fallaron", error.errors);
  };
    

    
}

getPokemon();