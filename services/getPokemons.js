const getPokemons = async () => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=898`);
  const data = await res.json();
  return data;
};

export default getPokemons;
