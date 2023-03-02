const pokemonRepository = (function () {

    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';

    function add(pokemon) {
        if (typeof pokemon === 'object'
            && 'name' in pokemon
            && 'detailsUrl' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.warn('wrong object type');
        }
    }

    function getAll() {
        return pokemonList;
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

    function resultOfButtonClick(button, pokemon) {
        button.addEventListener('click', function (event) {
            showDetails(pokemon);
        });
    }

    function loadList() {
        return fetch(apiUrl).then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                const pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);
            });
        }).catch(function (e) {
            console.error(e);
        })
    }

    function loadDetails(pokemon) {
        const url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Add the details to the item
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            console.log(pokemon);
        });
    }

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
        showDetails
    }

})();


pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});