import axios, { type AxiosInstance } from 'axios'

const client: AxiosInstance = axios.create({
  headers: {
    'Content-type': 'application/json',
    Accept: 'application/json'
  }
})

client.interceptors.request.use(async (config) => {
  return config
})

client.interceptors.response.use(
  (response) => {
    return response
  },
  async (error) => {
    return Promise.reject(error)
  }
)

export { client }
