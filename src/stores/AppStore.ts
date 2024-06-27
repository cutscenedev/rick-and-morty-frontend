import { makeAutoObservable } from 'mobx'

import UserStore from './UserStore';

class AppStore {
  appInitialized = false;

  constructor(
    private readonly userStore: UserStore,
  ) {
    makeAutoObservable(this)
  }

  async initApp() {
    await this.userStore.loginFromStorage();

    this.appInitialized = true;
  }
}

export default AppStore;
