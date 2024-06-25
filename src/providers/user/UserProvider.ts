
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

class UserProvider {
  constructor(private readonly BackendAPI: BackendAPI) {}

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
}

export default UserProvider
