import fetchPokemons from './modules/fetchPokemons.js';
import initSelectDropdown from './modules/select-dropdown.js';
import orderPokemons from './modules/orderPokemons.js';
import searchPokemon from './modules/searchPokemon.js';
import initFilterPokemons from './modules/filterPokemons.js';
import importPokemonTypes from '../services/importPokemonTypes.js';
import importPokemonAbilities from '../services/importPokemonAbilities.js';
import initMenuMobile from './modules/menuMobile.js';
import initModal from './modules/modal.js';

await importPokemonTypes();
await importPokemonAbilities();
initSelectDropdown();
initMenuMobile();
initModal();

const pokemonsList = await fetchPokemons();
export let filteredPokemons = [];
orderPokemons(pokemonsList);
searchPokemon(pokemonsList);
initFilterPokemons(pokemonsList);

export function modifyFilteredPokemons(newFilteredPokemons) {
  filteredPokemons = newFilteredPokemons;
}
