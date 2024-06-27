import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'

import { Config } from '../config'

class BackendAPI {
  private readonly client: AxiosInstance

  constructor(
    private readonly config: Config,
  ) {
    this.client = axios.create({
      baseURL: config.BACKEND_API_URL,
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
    })
  }

  async request<ResponseData = any>(config: AxiosRequestConfig) {
    return this.client.request<ResponseData>(config)
  }
}

export default BackendAPI
