import getPokemonSprite from '../../services/getPokemonSprite.js';
import showPokemonId from '../../services/showPokemonId.js';
import showPokemonInfo from '../../services/showPokemonInfo.js';
import { toggleModal } from './modal.js';

const pokemonWrapper = document.querySelector('.pokedex-content');

function createPokemon(pokemon) {
  const sprite = getPokemonSprite(pokemon.name);
  const div = document.createElement('div');
  div.classList.add('pokemon-short-info', 'hvr-float');
  div.setAttribute('data-modal', 'open');
  const random = Math.floor(Math.random() * 3);
  switch (random) {
    case 0:
      div.classList.add('slide-left');
      break;
    case 1:
      div.classList.add('slide-right');
      break;
    case 2:
      div.classList.add('slide-up');
      break;
    case 3:
      div.classList.add('slide-down');
      break;
  }
  div.innerHTML = `
           <img class="img-pokemon ${classLargePokemon(
             pokemon.name,
           )}" src="https://play.pokemonshowdown.com/sprites/ani/${sprite}.gif" alt="pokemon-${sprite}" />
            <span class="number">N&#186; ${showPokemonId(pokemon.id)}</span>
            <span class="name">${pokemon.name}</span>
            <div class="types">
              ${putPokemonTypes(pokemon.types)}
            </div>
          `;
  div.addEventListener('click', () => showPokemonInfo(pokemon));
  div.addEventListener('click', () => showPokemonInfo(pokemon, 1));
  div.addEventListener('click', toggleModal);
  return div;
}

function putPokemonTypes(types) {
  return types.map(({ type }) => `<div class="type ${type.name}">${type.name}</div>`).join('');
}

function classLargePokemon(name) {
  if (name == 'charizard' || name == 'infernape' || name == 'dialga' || name == 'zekrom') {
    return 'largePokemon';
  }
  return '';
}

export default function putPokemon(pokemon) {
  const pokeDiv = createPokemon(pokemon);
  pokemonWrapper.appendChild(pokeDiv);
}
