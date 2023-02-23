const pokemonList = [
    {
        name: 'Pikachu', 
        height: 0.4, 
        types: ['Field', ' Fairy'], 
        abilities: ['Static', ' Lightningrod']
    },
    {
        name: 'Charmander', 
        height: 0.6, 
        types: ['Monster', ' Dragon'], 
        abilities: ['Blaze', ' Solar-power']
    },
    {
        name: 'Squirtle', 
        height: 0.5, 
        types: ['Monster', ' Water 1'], 
        abilities: ['Rain-dish', ' Torrent']
    },
    {
        name: 'Charmeleon', 
        height: 1.1, 
        types: ['Monster', ' Dragon'], 
        abilities: ['Blaze', ' Solar-power']
    }
];

pokemonList.forEach(function(pokemon){

    const name = pokemon.name;
    const height = pokemon.height;
    const types = pokemon.types;
    const abilities = pokemon.abilities;

    const firstPart = `Name: ${name}. Height: ${height}.`;
    const secondPart = `Types: ${types}. Abilities: ${abilities}. </br>`;



    if( height < 1){
        document.write(`${firstPart} ${secondPart}`);
    }else if( height >= 1){
        document.write(`${firstPart} - WOW, THAT’S BIG! ${secondPart}`);
    }

})