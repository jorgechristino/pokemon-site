import getPokemons from '../../services/getPokemons.js';
import getPokemonByUrl from '../../services/getPokemonByUrl.js';
import showPokemonInfo from '../../services/showPokemonInfo.js';

export default async function fetchPokemons() {
  try {
    const pokemons = await getPokemons();
    const pokemonsList = Promise.all(
      pokemons.results.map(async (pokemon) => {
        const p = await getPokemonByUrl(pokemon.url);
        if (p.id == 1) showPokemonInfo(p);
        return p;
      }),
    );

    return pokemonsList;
  } catch (e) {
    console.error(e);
  }
}
