export default async function importPokemonAbilities() {
  const ulAbilities = document.querySelector('.items-ability');

  const res = await fetch('https://pokeapi.co/api/v2/ability?limit=358');
  const data = await res.json();
  const abilities = data.results;
  abilities.forEach((ability) => {
    const li = document.createElement('li');
    li.classList.add('item');
    li.innerHTML = `<span class='checkbox'>
                      <i class='fa-solid fa-check check-icon'></i>
                    </span>
                    <span class='item-text'>${ability.name}</span>`;
    ulAbilities.appendChild(li);
  });
}
