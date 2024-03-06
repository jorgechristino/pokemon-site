import putPokemon from './putPokemon.js';
import weaknessesPokemon from '../../services/weaknessesPokemon.js';
import { verifyItemsSelected } from './select-dropdown.js';
import { modifyFilteredPokemons } from '../index.js';

export default function initFilterPokemons(pokemons) {
  const pokemonWrapper = document.querySelector('.pokedex-content');
  const btnFilter = document.querySelector('.filter-btn');
  const resetFilter = document.querySelector('.reset-btn');

  async function putFilteredPokemon() {
    pokemonWrapper.innerHTML = '';
    pokemonWrapper.appendChild(putLoader());
    let resultFilter = await filterPokemon(pokemons);
    modifyFilteredPokemons(resultFilter);
    pokemonWrapper.innerHTML = '';
    for (let i = 0; i < 12; i++) {
      if (resultFilter[i] != undefined) putPokemon(resultFilter[i]);
    }
  }

  function resetFilterPokemon() {
    document.getElementById('numberFrom').value = 0;
    document.getElementById('numberTo').value = 898;
    const itemsChecked = document.querySelectorAll('.filter2 .checked');
    itemsChecked.forEach((item) => {
      item.classList.remove('checked');
    });
    verifyItemsSelected();
    putFilteredPokemon();
  }

  btnFilter.addEventListener('click', putFilteredPokemon);
  resetFilter.addEventListener('click', resetFilterPokemon);
}

export async function filterPokemon(pokemons) {
  let typesFiltered = document.querySelectorAll('.items-type .checked .item-text');
  typesFiltered = Array.from(typesFiltered).map((t) => t.innerText.toLowerCase());

  let weaknessesFiltered = document.querySelectorAll('.items-weaknesses .checked .item-text');
  weaknessesFiltered = Array.from(weaknessesFiltered).map((t) => t.innerText.toLowerCase());

  let abiltiesFiltered = document.querySelectorAll('.items-ability .checked .item-text');
  abiltiesFiltered = Array.from(abiltiesFiltered).map((t) => t.innerText.toLowerCase());

  let heightsFiltered = document.querySelectorAll('.items-height .checked .item-text');
  heightsFiltered = Array.from(heightsFiltered).map((t) => t.innerText.toLowerCase());

  let weightsFiltered = document.querySelectorAll('.items-weight .checked .item-text');
  weightsFiltered = Array.from(weightsFiltered).map((t) => t.innerText.toLowerCase());

  let numberFrom = document.getElementById('numberFrom').value;
  let numberTo = document.getElementById('numberTo').value;

  //filter by type
  let resultFilter = pokemons.filter((pokemon) => {
    const typesName = pokemon.types.map((t) => t.type.name);
    const typesIncluded = typesFiltered.every((tFiltered) => {
      return typesName.includes(tFiltered);
    });
    return typesIncluded;
  });

  //filter by weakness
  if (weaknessesFiltered.length != 0) {
    const filteredPromises = resultFilter.map(async (pokemon) => {
      const typesName = pokemon.types.map((t) => t.type.name);
      const weaknessesName = await weaknessesPokemon(typesName);
      if (weaknessesFiltered.length == 0) {
        return {
          ...pokemon,
          weaknessesIncluded: true,
        };
      }

      const weaknessesIncluded = weaknessesFiltered.some((wFiltered) => {
        return weaknessesName.includes(wFiltered);
      });

      return {
        ...pokemon,
        weaknessesIncluded: weaknessesIncluded,
      };
    });

    const filteredResults = await Promise.all(filteredPromises);
    resultFilter = filteredResults.filter((pokemon) => pokemon.weaknessesIncluded);
  }
  //filter by ability
  resultFilter = resultFilter.filter((pokemon) => {
    const abilitiesName = pokemon.abilities.map((a) => a.ability.name);
    const abilitiesIncluded = abiltiesFiltered.some((aFiltered) => {
      return abilitiesName.includes(aFiltered);
    });
    if (abiltiesFiltered.length == 0) {
      return true;
    }
    return abilitiesIncluded;
  });

  //filter by height
  resultFilter = resultFilter.filter((pokemon) => {
    let heightPokemon;
    if (pokemon.height <= 12) {
      heightPokemon = 'small';
    } else if (pokemon.height > 12 && pokemon.height < 22) {
      heightPokemon = 'medium';
    } else {
      heightPokemon = 'large';
    }

    if (heightsFiltered.length == 0) return true;
    return heightsFiltered.includes(heightPokemon);
  });

  //filter by weight
  resultFilter = resultFilter.filter((pokemon) => {
    let weightPokemon;
    if (pokemon.weight <= 450) {
      weightPokemon = 'small';
    } else if (pokemon.weight > 450 && pokemon.weight < 2250) {
      weightPokemon = 'medium';
    } else {
      weightPokemon = 'large';
    }

    if (weightsFiltered.length == 0) return true;
    return weightsFiltered.includes(weightPokemon);
  });

  //filter by range of numbers
  resultFilter = resultFilter.filter((pokemon) => {
    return pokemon.id >= numberFrom && pokemon.id <= numberTo;
  });

  return resultFilter;
}

function putLoader() {
  const loader = document.createElement('div');
  loader.classList.add('loader');
  return loader;
}
