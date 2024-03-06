import { modifyFilteredPokemons } from '../index.js';
import { filterPokemon } from './filterPokemons.js';
import initModal from './modal.js';
import putLoader from './putLoader.js';
import putPokemon from './putPokemon.js';
import scrollAnimation from './scrollAnimation.js';

let filteredPokemons;

export default async function orderPokemons(pokemons) {
  const option = document.querySelector('.select-order .btn-text');
  const pokemonWrapper = document.querySelector('.pokedex-content');

  async function sortPokemonsByOption(option) {
    pokemonWrapper.innerHTML = '';
    pokemonWrapper.appendChild(putLoader());
    switch (option) {
      case 'Ascending':
        pokemons.sort((a, b) => a.id - b.id);
        filteredPokemons = await filterPokemon(pokemons);
        modifyFilteredPokemons(filteredPokemons);
        pokemonWrapper.innerHTML = '';
        for (let i = 0; i < 12; i++) {
          if (filteredPokemons[i] != undefined) putPokemon(filteredPokemons[i]);
        }
        break;
      case 'Descending':
        pokemons.sort((a, b) => a.id - b.id).reverse();
        filteredPokemons = await filterPokemon(pokemons);
        modifyFilteredPokemons(filteredPokemons);
        pokemonWrapper.innerHTML = '';
        for (let i = 0; i < 12; i++) {
          if (filteredPokemons[i] != undefined) putPokemon(filteredPokemons[i]);
        }
        break;
      case 'A - Z':
        pokemons.sort((a, b) => {
          if (a.species.name < b.species.name) {
            return -1;
          }
          if (a.species.name > b.species.name) {
            return 1;
          }
          return 0;
        });
        filteredPokemons = await filterPokemon(pokemons);
        pokemonWrapper.innerHTML = '';
        modifyFilteredPokemons(filteredPokemons);
        pokemonWrapper.innerHTML = '';
        for (let i = 0; i < 12; i++) {
          if (filteredPokemons[i] != undefined) putPokemon(filteredPokemons[i]);
        }
        break;
      case 'Z - A':
        pokemons.sort((a, b) => {
          if (a.species.name < b.species.name) {
            return 1;
          }
          if (a.species.name > b.species.name) {
            return -1;
          }
          return 0;
        });
        filteredPokemons = await filterPokemon(pokemons);
        pokemonWrapper.innerHTML = '';
        modifyFilteredPokemons(filteredPokemons);
        pokemonWrapper.innerHTML = '';
        for (let i = 0; i < 12; i++) {
          if (filteredPokemons[i] != undefined) putPokemon(filteredPokemons[i]);
        }
        break;
    }
  }

  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach(async (m) => {
      await sortPokemonsByOption(m.target.innerText);
    });
  });
  const observerConfig = { childList: true, characterData: true };
  observer.observe(option, observerConfig);

  await sortPokemonsByOption('Ascending');
  scrollAnimation();
}
