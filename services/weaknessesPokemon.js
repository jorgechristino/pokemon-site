export default async function weaknessesPokemon(pokemonTypes) {
  return await getDamagesFrom(pokemonTypes);
}

async function getDamagesFrom(pokemonTypes) {
  let doubleDamageFrom = await Promise.all(
    pokemonTypes.map(async (type) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      return data.damage_relations.double_damage_from;
    }),
  );

  let halfDamageFrom = await Promise.all(
    pokemonTypes.map(async (type) => {
      const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
      const data = await res.json();
      return data.damage_relations.half_damage_from;
    }),
  );

  let strengths = [];
  halfDamageFrom.forEach((e) => {
    e.forEach((type) => {
      strengths.push(type.name);
    });
  });

  let weaknesses = [];
  doubleDamageFrom.forEach((e) => {
    e.forEach((type) => {
      if (!strengths.includes(type.name)) weaknesses.push(type.name);
    });
  });

  weaknesses = [...new Set(weaknesses)];

  return weaknesses;
}
