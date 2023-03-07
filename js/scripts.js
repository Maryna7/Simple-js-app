const pokemonRepository = (function () {

    const pokemonList = [];
    const apiUrl = 'https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20';

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

        const pokemonList = document.querySelector('.pokemon-list');
        const listItem = document.createElement('li');
        const button = document.createElement('button');

        button.innerText = pokemon.name;
        button.classList.add('pokemon-button');

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
            pokemon.imageUrl = details.sprites.front_default;
            pokemon.height = details.height;
            pokemon.types = details.types.map(el => el.type.name);
        }).catch(function (e) {
            console.error(e);
        });
    }

    //Creating a modal window with information about a Pokemon

    const modalContainer = document.querySelector('#modal-container');

    function showModal({name, imageUrl, height, types}) {

        modalContainer.innerHTML = '';

        const modal = document.createElement('div');
        modal.classList.add('modal');

        const closeButton = document.createElement('button');
        closeButton.classList.add('close-button');
        closeButton.innerText = 'Close';
        closeButton.addEventListener('click', hideModalDetais);

        const modalTitle = document.createElement('h1');
        modalTitle.innerText = name;

        const modalImage = document.createElement('img');
        modalImage.setAttribute('src', imageUrl);
        modalImage.setAttribute('width', '250');
        modalImage.setAttribute('height', '250');
        modalImage.setAttribute('alt', 'Image of a pokemon');

        const modalContentHeight = document.createElement('p');
        modalContentHeight.innerText = height;

        const modalContentType = document.createElement('p');
        modalContentType.innerText = types;

        modal.appendChild(closeButton);
        modal.appendChild(modalTitle);
        modal.appendChild(modalImage);
        modal.appendChild(modalContentHeight);
        modal.appendChild(modalContentType);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    //Close a modal window
    function hideModalDetais() {
        modalContainer.classList.remove('is-visible');
    }

    modalContainer.addEventListener('click', (e) => {
        const target = e.target;
        if (modalContainer === target) {
            hideModalDetais();
        }
    })

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModalDetais();
        }
    })

    return {
        add,
        getAll,
        addListItem,
        loadList,
        loadDetails
    }

})();

pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.loadDetails(pokemon).then(()=> {
            pokemonRepository.addListItem(pokemon)
        });
    });
});
