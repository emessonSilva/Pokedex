
function filterPokemonsByName(pokemons, searchTerm) {
    searchTerm = searchTerm.toLowerCase();
    return pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
}

function renderFilteredPokemonList(filteredPokemons) {
    const pokemonList = document.getElementById('pokemonList');
    const html = filteredPokemons.map(pokemon => convertPokemonToLi(pokemon)).join('');
    pokemonList.innerHTML = html;
}

function setupSearch(pokemons) {
    const searchInput = document.getElementById('searchInput');

    searchInput.addEventListener('input', () => {
        const searchTerm = searchInput.value.trim();
        const filteredPokemons = filterPokemonsByName(pokemons, searchTerm);
        renderFilteredPokemonList(filteredPokemons);
    });
}
