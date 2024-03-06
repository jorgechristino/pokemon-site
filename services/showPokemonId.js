const showPokemonId = (id) => {
  let idString = id.toString();
  for (let i = idString.length; i < 3; i++) {
    idString = "0" + idString;
  }

  return idString;
};

export default showPokemonId;
