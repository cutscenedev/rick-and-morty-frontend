
import { AxiosResponse } from 'axios'
import BackendAPI from '../../apis/BackendAPI'

interface Response {
  characters: {
    results: Character[]
  }
}

interface Character {
  name: string
}

class CharactersProvider {
  constructor(private readonly BackendAPI: BackendAPI) {}

  async getCharacters(page = 1): Promise<Character[]> {
    const { data } = await this.BackendAPI.request<AxiosResponse<Response>>({
      url: '/ramproxy',
      data: {
        query: `{
          characters(page: ${page}) {
            results {
              image
              name
              species
              gender
              status
              origin {
                name
                dimension
              }
              episode {
                name
                air_date
              }
            }
          }
        }`,
      },
    })

    return data.data.characters.results;
  }
}

export default CharactersProvider
