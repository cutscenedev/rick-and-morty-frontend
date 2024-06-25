const config = {
  BACKEND_API_URL: 'http://localhost:4000/graphql',
} as const

type Config = typeof config

export type { Config }
export { config }
