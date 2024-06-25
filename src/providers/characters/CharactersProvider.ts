
import { AxiosResponse } from 'axios'
import BackendAPI from '../../apis/BackendAPI'

interface Response {
  characters: {
    results: Character[]
  }
}

export interface Character {
  episode: {
    name: string,
    air_date: string
  }[]
  gender: string
  image: string
  name: string
  origin: {
    name: string
    dimension: string
  }
  species: string
  status: string
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
