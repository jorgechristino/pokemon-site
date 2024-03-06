import getPokemonSpecie from './getPokemonSpecie.js';
import getPokemonSprite from './getPokemonSprite.js';
import showPokemonId from './showPokemonId.js';
import weaknessesPokemon from './weaknessesPokemon.js';
import getPokemonEvolution from './getPokemonEvolution.js';
import getPokemonByUrl from './getPokemonByUrl.js';

export default async function showPokemonInfo(pokemon, modal) {
  insertSkeleton(modal);
  const pokemonSpecie = await getPokemonSpecie(pokemon.id);
  const pokemonTypes = pokemon.types.map((t) => t.type.name);
  const weaknesses = await weaknessesPokemon(pokemonTypes);

  const div = !modal ? document.querySelector('.info-fixed') : document.querySelector('.modal');
  const imgInfo = div.querySelector('.img-pokemon-info');
  const info2 = div.querySelector('.info2');

  const previousPokemon =
    pokemon.id - 1 > 0
      ? await getPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.id - 1}`)
      : null;
  const nextPokemon = await getPokemonByUrl(`https://pokeapi.co/api/v2/pokemon/${pokemon.id + 1}`);

  const sprite = getPokemonSprite(pokemon.name);
  const urlImg = `https://play.pokemonshowdown.com/sprites/ani/nameImage.gif`;
  const img = document.createElement('img');
  img.classList.add('image-pokemon');
  img.src = urlImg.replace(`nameImage`, `${sprite}`);
  imgInfo.innerHTML = '';

  removeSkeleton(modal);

  imgInfo.appendChild(img);
  info2.querySelector('.number').innerHTML = `#${showPokemonId(pokemon.id)}`;
  info2.querySelector('.name').innerHTML = `${pokemon.name}`;
  info2.querySelector('.small-description').innerHTML = `${pokemonSpecie.genera[7].genus}`;
  info2.querySelector('.types').innerHTML = `${putPokemonTypes(pokemon.types)}`;
  div.querySelector(
    '.description',
  ).innerHTML = `${pokemonSpecie['flavor_text_entries'][17]['flavor_text']}`;
  div.querySelector('.abilities').innerHTML = `${putPokemonAbilities(pokemon.abilities)}`;
  div.querySelector('.height').innerHTML = `${pokemon.height / 10} m`;
  div.querySelector('.weight').innerHTML = `${pokemon.weight / 10} kg`;
  div.querySelector('.weakness-content').innerHTML = '';
  weaknesses.forEach((weakness) => {
    div.querySelector('.weakness-content').appendChild(putPokemonWeaknesses(weakness));
  });
  div.querySelector('.base_exp').innerHTML = `${pokemon.base_experience}`;

  div.querySelector('.hp + span').innerHTML = `${pokemon.stats[0].base_stat}`;
  div.querySelector('.atk + span').innerHTML = `${pokemon.stats[1].base_stat}`;
  div.querySelector('.def + span').innerHTML = `${pokemon.stats[2].base_stat}`;
  div.querySelector('.spA + span').innerHTML = `${pokemon.stats[3].base_stat}`;
  div.querySelector('.spD + span').innerHTML = `${pokemon.stats[4].base_stat}`;
  div.querySelector('.spd + span').innerHTML = `${pokemon.stats[5].base_stat}`;
  div.querySelector('.tot + span').innerHTML = `${totalStatsPokemon(pokemon.stats)}`;

  div.querySelector('#evolution').innerHTML = `<span class="info-title">Evolution</span>`;
  div.querySelector('#evolution').appendChild(await getPokemonEvolution(pokemon.name));

  div.querySelector('.previous-next-pokemon').innerHTML = '';
  if (previousPokemon != null) {
    const divPrevious = document.createElement('div');
    divPrevious.classList.add('previous');
    divPrevious.innerHTML = `<i class="fa-solid fa-angle-left"></i>
                           <img src="${urlImg.replace(
                             `nameImage`,
                             `${getPokemonSprite(previousPokemon.name)}`,
                           )}" />
                           <span class="name">${previousPokemon.name}</span>
                           <span class="number">#${showPokemonId(previousPokemon.id)}</span>`;
    divPrevious.addEventListener('click', () => showPokemonInfo(previousPokemon, modal));
    div.querySelector('.previous-next-pokemon').appendChild(divPrevious);

    const iconSlash = document.createElement('i');
    iconSlash.className = 'fa-solid fa-minus fa-rotate-90';
    div.querySelector('.previous-next-pokemon').appendChild(iconSlash);
  }

  const divNext = document.createElement('div');
  divNext.classList.add('next');
  divNext.innerHTML = `
            <img src="${urlImg.replace(`nameImage`, `${getPokemonSprite(nextPokemon.name)}`)}" />
            <span class="name">${nextPokemon.name}</span>
            <span class="number">#${showPokemonId(nextPokemon.id)}</span>
            <i class="fa-solid fa-angle-right"></i>`;
  divNext.addEventListener('click', () => showPokemonInfo(nextPokemon, modal));
  div.querySelector('.previous-next-pokemon').appendChild(divNext);
}

function putPokemonTypes(types) {
  return types.map(({ type }) => `<div class="type ${type.name}">${type.name}</div>`).join('');
}

function putPokemonWeaknesses(weakness) {
  const divIcon = document.createElement('div');
  divIcon.classList.add('icon');
  divIcon.classList.add(`${weakness}`);
  divIcon.innerHTML = `<img src="img/icon_types/${weakness}.svg"/>`;

  return divIcon;
}

function putPokemonAbilities(abilities) {
  return abilities
    .map(
      ({ ability }) =>
        `<div class="info-content"><span class="ability">${ability.name}</span></div>`,
    )
    .join('');
}

function totalStatsPokemon(stats) {
  let sum = 0;
  stats.forEach((s) => {
    sum += s.base_stat;
  });
  return sum;
}

function removeSkeleton(modal) {
  const infoDiv = !modal ? document.querySelector('.info-fixed') : document.querySelector('.modal');
  var elementsWithShine = infoDiv.querySelectorAll('.shine');
  elementsWithShine.forEach(function (element) {
    element.classList.remove('shine');
  });
  document.querySelector('.stats-background:last-child').classList.add('total-background');
}

function insertSkeleton(modal) {
  const infoDiv = !modal ? document.querySelector('.info-fixed') : document.querySelector('.modal');
  infoDiv.innerHTML = `
            <div class="pokemon-main-info shine">
              <div class="img-pokemon-info shine">
                <img class="image-pokemon">
              </div>
              <div class="info2">
                <span class="number shine"></span>
                <span class="name shine"></span>
                <span class="small-description shine"></span>
                <div class="types">
                  <div class="shine"></div>
                  <div class="shine"></div>
                </div>
              </div>
            </div>
            <div class="info2">
              <span class="info-title">Pokedex Entry</span>
              <p class="description shine"></p>
            </div>
            <div class="info-characteristics">
              <div class="info1">
                <span class="info-title">Abilities</span>
                <div class="abilities">
                  <div class="info-content shine"><span></span></div>
                  <div class="info-content shine"><span></span></div>
                </div>
              </div>

              <div class="info2">
                <span class="info-title">Height</span>
                <div class="info-content shine ">
                  <span class="height"></span>
                </div>
              </div>

              <div class="info2">
                <span class="info-title">Weight</span>
                <div class="info-content shine">
                  <span class="weight"></span>
                </div>
              </div>

              <div class="info2">
                <span class="info-title">Weaknesses</span>
                <div class="info-content weakness-content shine"></div>
              </div>

              <div class="info2">
                <span class="info-title">Base Exp</span>
                <div class="info-content shine">
                  <span class="base_exp"></span>
                </div>
              </div>

              <div class="info1">
                <span class="info-title">Stats</span>
                <div class="stats">
                  <div class="stats-background shine">
                    <div class="stats-type hp">HP</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type atk">ATK</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type def">DEF</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type spA">SpA</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type spD">SpD</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type spd">SPD</div>
                    <span class="stats-value"></span>
                  </div>
                  <div class="stats-background shine">
                    <div class="stats-type tot">TOT</div>
                    <span class="stats-value"></span>
                  </div>
                </div>
              </div>

              <div id="evolution" class="info1">
                <span class="info-title">Evolution</span>
                <div class="evolution">
                  <div class="img-evolution shine"></div>
                  <div class="level shine"></div>
                  <div class="img-evolution shine"></div>
                  <div class="level shine"></div>
                  <div class="img-evolution shine"></div>
                </div>
              </div>
              <div class="previous-next-pokemon info1 shine">

              </div>
            </div>
  `;
}
