const pokemonRepository = (function () {

    const repository = [
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

    function add(item) {
        repository.push(item);
    }

    function getAll() {
        return repository;
    }

    function addListItem(pokemon) {

        const pokemonList = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        resultOfButtonClick(button, pokemon)
    }

    function resultOfButtonClick(button, pokemon){
        button.addEventListener('click', function(event){
            showDetails(pokemon);
        });
    }


    function showDetails(pokemon){
        console.log(pokemon)
    }

    return {
        add,
        getAll,
        addListItem
    }

})();


pokemonRepository.getAll().forEach(function (pokemon) {

    pokemonRepository.addListItem(pokemon);

})