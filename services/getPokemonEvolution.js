import getPokemonSpecie from './getPokemonSpecie.js';
import getPokemonSprite from './getPokemonSprite.js';

export default async function getPokemonEvolution(pokemon) {
  const pokemonSpecie = await getPokemonSpecie(pokemon);

  const resEvolultionChain = await fetch(pokemonSpecie.evolution_chain.url);
  const dataEvolultionChain = await resEvolultionChain.json();

  const divEvolution = document.createElement('div');
  divEvolution.classList.add('evolution');

  const specieInitial = dataEvolultionChain.chain.species.name;
  const imgEvolution = document.createElement('img');
  imgEvolution.classList.add('img-evolution');
  let sprite = getPokemonSprite(specieInitial);
  imgEvolution.src = `https://play.pokemonshowdown.com/sprites/ani/${sprite}.gif`;
  imgEvolution.width *= 0.6;
  divEvolution.appendChild(imgEvolution);

  let evolutions = dataEvolultionChain.chain.evolves_to;

  while (evolutions.length > 0) {
    evolutions.forEach((evolution) => {
      const nameEvolution = evolution.species.name;
      const evolutionDetails = evolution.evolution_details;

      const img = document.createElement('img');
      img.classList.add('img-evolution');
      sprite = getPokemonSprite(nameEvolution);
      img.src = `https://play.pokemonshowdown.com/sprites/ani/${sprite}.gif`;
      img.width *= 0.6;
      divEvolution.appendChild(img);

      const divDetail = document.createElement('div');
      divDetail.classList.add('level');
      if (evolutionDetails[0].min_level) {
        divDetail.innerHTML = `Lvl.  ${evolutionDetails[0].min_level}`;
      } else if (evolutionDetails[0].min_happiness) {
        divDetail.innerHTML = `<img src='img/heart-solid.svg'><span>(Friendship)</span>`;
      } else if (evolutionDetails[0].item) {
        divDetail.innerHTML = `<img width="20px" src='img/icons/items/${evolutionDetails[0].item.name}.png'>`;
      } else if (evolutionDetails[0].trigger.name == 'trade') {
        divDetail.innerHTML = `<span>(Trade)</span>`;
      }

      divEvolution.appendChild(divDetail);
      divEvolution.appendChild(img);
    });

    evolutions = evolutions[0].evolves_to;
  }
  return divEvolution;
}
