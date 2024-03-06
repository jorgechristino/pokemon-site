import { modifyFilteredPokemons } from '../index.js';
import { filterPokemon } from './filterPokemons.js';
import putLoader from './putLoader.js';
import putPokemon from './putPokemon.js';

export default function searchPokemon(pokemons) {
  const pokemonWrapper = document.querySelector('.pokedex-content');
  const inputSearch = document.querySelector('input[type="search"]');
  inputSearch.oninput = async () => {
    pokemonWrapper.innerHTML = '';
    pokemonWrapper.appendChild(putLoader());
    let resultFilter = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(inputSearch.value.toLowerCase()),
    );

    resultFilter = await filterPokemon(resultFilter);

    modifyFilteredPokemons(resultFilter);
    pokemonWrapper.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      if (resultFilter[i] != undefined) putPokemon(resultFilter[i]);
    }
  };
}
