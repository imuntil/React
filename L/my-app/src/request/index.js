import axios from 'axios'

let bearer = ''

const getToken = () => {
  return bearer ? bearer : (bearer = localStorage.getItem('szk_token') || '')
}

const instance = axios.create({
  baseURL: '/shizuku/',
  timeout: 1000
})

instance.interceptors.request.use(
  config => {
    const headers = config.headers
    return {
      ...config,
      headers: {
        ...headers,
        Authorization: `Bearer ${getToken()}`
      }
    }
  },
  err => {
    console.error('__request:', err.message)
    return Promise.reject(err)
  }
)

instance.interceptors.response.use(
  response => {
    const { data } = response
    return { [data.code === 1 ? 'res' : 'fail']: data }
  },
  err => {
    console.error('__response:', err.message)
    console.log(err)
    return Promise.reject(err)
  }
)

export default instance
export * from './user'
export * from './li'
