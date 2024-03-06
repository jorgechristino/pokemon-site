export default async function importPokemonTypes() {
  const ulTypes = document.querySelector('.items-type');
  const ulWeaknesses = document.querySelector('.items-weaknesses');

  const res = await fetch('https://pokeapi.co/api/v2/type');
  const data = await res.json();
  const types = data.results;
  types.forEach((type) => {
    const liType = document.createElement('li');
    liType.classList.add('item');
    liType.innerHTML = `<span class='checkbox'>
                      <i class='fa-solid fa-check check-icon'></i>
                    </span>
                    <span class='item-text'>${type.name}</span>`;
    ulTypes.appendChild(liType);

    const liWeakness = document.createElement('li');
    liWeakness.classList.add('item');
    liWeakness.innerHTML = `<span class='checkbox'>
                      <i class='fa-solid fa-check check-icon'></i>
                    </span>
                    <span class='item-text'>${type.name}</span>`;
    ulWeaknesses.appendChild(liWeakness);
  });
}
