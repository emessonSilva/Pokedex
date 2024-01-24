const pokemonList = document.getElementById('pokemonList');
const loadMoreButton = document.getElementById('loadMoreButton');
const searchInput = document.getElementById('searchInput');

const maxRecords = 152;
const limit = 12;
let offset = 0;
let pokemons = [];

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
        </li>
    `;
}

function loadPokemonItems(offset, limit) {
    return pokeApi.getPokemons(offset, limit).then((newPokemons = []) => {
        pokemons = [...pokemons, ...newPokemons];
        renderPokemonList();
    });
}

function renderPokemonList(filteredPokemons = pokemons) {
    const newHtml = filteredPokemons.map(convertPokemonToLi).join('');
    pokemonList.innerHTML = newHtml;
}

function setupSearch() {
    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const filteredPokemons = filterPokemonsByName(pokemons, searchTerm);
        renderPokemonList(filteredPokemons);
    });

    loadMoreButton.addEventListener('click', () => {
        offset += limit;
        const qtdRecordsWithNextPage = offset + limit;

        if (qtdRecordsWithNextPage >= maxRecords) {
            const newLimit = maxRecords - offset;
            loadPokemonItems(offset, newLimit).then(() => {
                loadMoreButton.parentElement.removeChild(loadMoreButton);
            });
        } else {
            loadPokemonItems(offset, limit);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupSearch();
    loadPokemonItems(offset, limit);
});

function filterPokemonsByName(pokemons, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().startsWith(searchTerm));
}