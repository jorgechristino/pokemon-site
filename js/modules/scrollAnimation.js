import putLoader from './putLoader.js';
import putPokemon from './putPokemon.js';
import { filteredPokemons } from '../index.js';

export default function scrollAnimation() {
  const pokemonWrapper = document.querySelector('.pokedex-content');
  const windowHeight = window.innerHeight;

  function animaScroll() {
    const pokemonCard = document.querySelector('.pokemon-short-info:last-child');
    const quantityPokemons = pokemonWrapper.querySelectorAll('.pokemon-short-info').length;
    let bottom;
    if (pokemonCard != null) bottom = pokemonCard.getBoundingClientRect().bottom;

    if (bottom < windowHeight && filteredPokemons.length - quantityPokemons > 0) {
      const loader = putLoader();
      loader.style.bottom = -100 + 'px';
      pokemonWrapper.appendChild(loader);

      setTimeout(function () {
        for (let i = quantityPokemons; i < quantityPokemons + 12; i++) {
          if (filteredPokemons[i] != undefined) putPokemon(filteredPokemons[i]);
        }
        pokemonWrapper.removeChild(loader);
      }, 500);
    }
  }

  window.addEventListener('scroll', animaScroll);
}
