import { makeAutoObservable } from "mobx";

import CharactersProvider, { Character } from "../../../providers/characters/CharactersProvider";
import UserStore from "../../../stores/UserStore";

class CharactersStore {
  characters: null | Character[] = null;

  get threeLatestEpisodes() {
    return this.characters
  }

  constructor(
    private readonly charactersProvider: CharactersProvider,
    private readonly userStore: UserStore,
  ) {
    makeAutoObservable(this)
  }

  async changeFavoriteCharacters() {

  }

  async loadCharacters() {
    try {
      const characters = await this.charactersProvider.getCharacters();

      this.characters = characters;
    } catch(err) {

    }
  }
}

export default CharactersStore;
