import { makeAutoObservable } from "mobx";

import CharactersProvider, { Character } from "../../../providers/characters/CharactersProvider";

class CharactersStore {
  characters: null | Character[] = null;

  constructor(
    private readonly charactersProvider: CharactersProvider,
  ) {
    makeAutoObservable(this)
  }

  async loadCharacters() {
    const characters = await this.charactersProvider.getCharacters();

    this.characters = characters;
  }
}

export default CharactersStore;
