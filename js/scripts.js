const pokemonRepository = (function () {

    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=200&limit=200';

    //Validate and add Pokemon to the list
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

    //Creating a Pokémon item for list

    function addListItem(pokemon) {

        if (pokemon.isVisible === false) {
            return;
        }

        const pokemonList = document.querySelector('.row');
        const listItem = document.createElement('div');
        const button = document.createElement('button');

        listItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-xl-2');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button', 'btn', 'btn-info', 'btn-lg', 'btn-block', 'text-capitalize');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('data-target', '#modal');

        listItem.appendChild(button);
        pokemonList.appendChild(listItem);

        resultOfButtonClick(button, pokemon)
    }

    //Add Event Listener to a button to open a modal window with Pokemon details
    function resultOfButtonClick(button, pokemon) {
        button.addEventListener('click', function (event) {
            showModal(pokemon);
        });
    }

    //Loading Pokémon Names from API into the List

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

    //Loading Pokémon details from API 

    function loadDetails(pokemon) {
        const url = pokemon.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            // Add the details to the item
            pokemon.frontImageUrl = details.sprites.front_default;
            pokemon.backImageUrl = details.sprites.back_default;
            pokemon.height = details.height;
            pokemon.weight = details.weight;
            pokemon.types = details.types.map(el => el.type.name);
            pokemon.abilities = details.abilities.map(el => el.ability.name);
            pokemon.isVisible = true;
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Creating a modal window with information about a Pokemon

    function showModal({ name, frontImageUrl, backImageUrl, height, weight, types, abilities }) {

        const modalTitle = document.querySelector('.modal-title');
        const modalBody = document.querySelector('.modal-body');

        modalTitle.innerHTML = '';
        modalBody.innerHTML = '';

        modalTitle.innerText = name;

        const frontModalImage = document.createElement('img');
        frontModalImage.classList.add('madal-img');
        frontModalImage.setAttribute('src', frontImageUrl);
        frontModalImage.setAttribute('width', '50%');
        frontModalImage.setAttribute('alt', 'Front image of a pokemon');

        const backModalImage = document.createElement('img');
        backModalImage.classList.add('madal-img');
        backModalImage.setAttribute('src', backImageUrl);
        backModalImage.setAttribute('width', '50%');
        backModalImage.setAttribute('alt', 'Back image of a pokemon');

        const modalContentHeight = document.createElement('p');
        modalContentHeight.innerText = `Height: ${height}`;

        const modalContentWeight = document.createElement('p');
        modalContentWeight.innerText = `Weight: ${weight}`;

        const modalContentType = document.createElement('p');
        modalContentType.innerText = `Types: ${types}`;

        const modalContentAbilities = document.createElement('p');
        modalContentAbilities.innerText = `Abilities: ${abilities}`;

        modalBody.appendChild(frontModalImage);
        modalBody.appendChild(backModalImage);
        modalBody.appendChild(modalContentHeight);
        modalBody.appendChild(modalContentWeight);
        modalBody.appendChild(modalContentType);
        modalBody.appendChild(modalContentAbilities);
    }

    ///////Creating a filter to search for pokemon using input

    const searchInput = document.getElementById('searchbar');

    function filterPokemons(inputValue) {

        pokemonList.forEach(function (pokemon) {
            if (pokemon.name.includes(inputValue)) {
                pokemon.isVisible = true;
            } else {
                pokemon.isVisible = false;
            }
        })

    }


    function liveSearch(event) {

        const pokemonListHTML = document.querySelector('.row');
        pokemonListHTML.innerHTML = '';

        filterPokemons(event.target.value.toLowerCase());

        pokemonList.forEach(function (pokemon) {
            addListItem(pokemon)
        })

    }

    searchInput.addEventListener('input', liveSearch);


    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails,
    }

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.loadDetails(pokemon).then(() => {
            pokemonRepository.addListItem(pokemon)
        });
    });
});