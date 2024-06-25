import { makeAutoObservable } from 'mobx'

import UserStore from './UserStore';

class AppStore {
  appInitialized: boolean = false;

  constructor(readonly userStore: UserStore) {
    makeAutoObservable(this)
  }

  async initApp() {
    await this.userStore.loginFromStorage();

    this.appInitialized = true;
  }
}

export default AppStore;
