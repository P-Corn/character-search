const autoCompleteConfig = {
  root: document.querySelector('#autocomplete'),
  renderOption(character) {
    return `
      <img src="${character.img}"/>
      ${character.name}
    `
  },
  inputValue(character) {
    return character.name;
  },
  async fetchData(searchTerm) {
    const response = await axios.get('https://www.breakingbadapi.com/api/characters', {
      params: {
        name: searchTerm
      }
    });

    return response.data;
  },
  onOptionSelect(character) {
    document.querySelector('.tutorial').classList.add('is-hidden');
    onCharacterSelect(character, document.querySelector('#summary'));
  }
}

createAutoComplete(autoCompleteConfig)

const onCharacterSelect = (character, summaryElement) => {
  summaryElement.innerHTML = characterTemplate(character);
}

const characterTemplate = (character) => {
  console.log(character)
  return `
  <article class="columns">
    <div class="column is-two-fifths">
        <p class="image">
            <img class="character-image" src="${character.img}" />
        </p>
    </div>
    <div class="column">
        <div class="content">
            <h1 class="is-inline">${character.name}</h1>
            <p class="title is-4 is-inline">(${character.nickname})</p>
        </div>
        <hr>
        <article>
          <p class="subtitle is-6">Portrayed by:</p>
          <p class="title is-5">${character.portrayed}</p>
        </article>
        <br>
        <article>
          <p class="subtitle is-6">Occupation:</p>
          <p class="title is-5">${character.occupation}</p>
        </article>
        <br>
        <article>
          <p class="subtitle is-6">Birthday:</p>
          <p class="title is-5">${character.birthday}</p>
        </article>
        <br>
        <article>
          <p class="subtitle is-6">Breaking Bad Season Appearances:</p>
          <p class="title is-5">${character.appearance}</p>
        </article>
        <br>
        <article>
          <p class="subtitle is-6">Better Call Saul Season Appearances:</p>
          <p class="title is-5">${character.better_call_saul_appearance === true ? 
            character.better_call_saul_appearance
          :
            'None'}</p>
        </article>
    </div>
  </article>
  `
}