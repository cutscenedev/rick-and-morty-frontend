import { makeAutoObservable, runInAction } from 'mobx'

import UserProvider, { User } from '../providers/user/UserProvider';

class UserStore {
  user: null | User = null

  loginInProgress = false;
  userUpdating = false;

  get loggedIn() {
    return Boolean(this.user);
  }

  constructor(
    private readonly userProvider: UserProvider,
  ) {
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

  async setNewFavoriteCharacters(newFavoriteCharacters: string[]) {
    if (this.userUpdating) return;

    if (this.user) {
      try {
        this.userUpdating = true;
        const newUser = await this.userProvider.updateFavoriteCharacters(
          this.user.userName,
          newFavoriteCharacters,
        );

        runInAction(() => {
          this.user = newUser;
          this.userUpdating = false;
          })
      } catch(err) {
        this.userUpdating = false;

        throw err;
      }
    }
  }

  logout() {
    this.removeSavedUsername();

    this.user = null;
  }

  async login(userName: string) {
    if (this.userUpdating) return;

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
    if (this.userUpdating) return;

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
