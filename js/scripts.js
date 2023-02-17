let pokemonList = [
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

for (let i = 0; i < pokemonList.length; i++ ){

    if(pokemonList[i].height < 1){
        document.write('Name: ' + pokemonList[i].name + '.' + ' Height: ' + pokemonList[i].height + '.' + ' Types: ' + pokemonList[i].types + '.' + ' Abilities ' + pokemonList[i].abilities + "<br>");
    }else if(pokemonList[i].height >= 1){
        document.write('Name: ' + pokemonList[i].name + '.' + ' Height: ' + pokemonList[i].height + ' - WOW, THAT\’S BIG!' + ' Types: ' + pokemonList[i].types + '.' + ' Abilities ' + pokemonList[i].abilities + "<br>");
    }

}