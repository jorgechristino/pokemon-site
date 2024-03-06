function getPokemonSprite(name) {
  const i = name.indexOf('-');
  let slice;
  if (i != -1) {
    slice = name.slice(i + 1);
    if (
      slice.length > 4 ||
      slice == 'land' ||
      slice == 'aria' ||
      slice == 'male' ||
      slice == '50' ||
      slice == 'solo' ||
      slice == 'ice'
    ) {
      return name.replace('-' + slice, '');
    }
  }

  return name.replace('-', '');
}

export default getPokemonSprite;
