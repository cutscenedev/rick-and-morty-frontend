
import { AxiosResponse } from 'axios'
import BackendAPI from '../../apis/BackendAPI'

export interface User {
  userName: string
  userSettings: {
    favoriteCharacters: string[]
  }
}

interface Response {
  login: User
}

interface UpdateFavoriteCharactersResponse {
  updateFavoriteCharacters: User
}

class UserProvider {
  constructor(
    private readonly BackendAPI: BackendAPI,
  ) {}

  async login(userName: string): Promise<User> {
    const { data } = await this.BackendAPI.request<AxiosResponse<Response>>({
      url: '/users',
      data: JSON.stringify({
        query: `mutation {
          login(userName: "${userName}") {
            userName
            userSettings {
              favoriteCharacters
            }
          }
        }`,
      }),
    })

    return data.data.login
  }

  async updateFavoriteCharacters(
    userName: string,
    newFavoriteCharacters: User['userSettings']['favoriteCharacters'],
  ): Promise<User> {
    const { data } = await this.BackendAPI.request<AxiosResponse<UpdateFavoriteCharactersResponse>>({
      url: '/users',
      data: JSON.stringify({
        query: `mutation UpdateFavoriteCharacters($userName: String!, $newFavoriteCharacters: [String!]!) {
          updateFavoriteCharacters(userName: $userName, newFavoriteCharacters: $newFavoriteCharacters) {
            userName
            userSettings {
              favoriteCharacters
            }
          }
        }`,
        variables: { userName, newFavoriteCharacters }
      }),
    })

    return data.data.updateFavoriteCharacters;
  }

}

export default UserProvider
