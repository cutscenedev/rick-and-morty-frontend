import { makeAutoObservable, runInAction } from 'mobx'

import UserProvider, { User } from '../providers/user/UserProvider';

class UserStore {
  user: null | User = null

  loginInProgress = false;

  get loggedIn() {
    return Boolean(this.user);
  }

  constructor(readonly userProvider: UserProvider) {
    makeAutoObservable(this)
  }

  private getSavedUserStorageKey() {
    return 'login-username'
  }

  getSavedUsername() {
    return localStorage.getItem(this.getSavedUserStorageKey());
  }

  setSavedUsername(userName: string) {
    localStorage.setItem(this.getSavedUserStorageKey(), userName)
  }

  removeSavedUsername() {
    localStorage.removeItem(this.getSavedUserStorageKey());
  }

  logout() {
    this.removeSavedUsername();

    this.user = null;
  }

  async login(userName: string) {
    try {
      this.loginInProgress = true;

      const user = await this.userProvider.login(userName);

      this.setSavedUsername(user.userName);

      runInAction(() => {
        this.user = user;
        this.loginInProgress = false;
      })
    } catch(err) {
      this.loginInProgress = false;

      throw err;
    }
  }

  async loginFromStorage() {
    const userName = this.getSavedUsername();

    if (userName) {
      this.loginInProgress = true;

      try {
        const user = await this.userProvider.login(userName);

        runInAction(() => {
          this.user = user;
          this.loginInProgress = false;
        })
      } catch(err) {
        this.loginInProgress = false;
        this.removeSavedUsername();

        throw err;
      }
    }
  }
}

export default UserStore;
