import { config } from './config';

import BackendAPI from "./apis/BackendAPI";
import UserProvider from './providers/user/UserProvider';
import CharactersProvider from './providers/characters/CharactersProvider';
import UserStore from './stores/UserStore';
import AppStore from './stores/AppStore';

class DependencyContainer {
  readonly config = config

  readonly BackendAPI = new BackendAPI(this.config);

  readonly userProvider = new UserProvider(this.BackendAPI);
  readonly charactersProvider = new CharactersProvider(this.BackendAPI);

  readonly userStore = new UserStore(this.userProvider);

  readonly appStore = new AppStore(this.userStore);
}

export default DependencyContainer;
