const getPokemonSpecie = async (name) => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${name}`);
  const data = await res.json();
  return data;
};

export default getPokemonSpecie;
