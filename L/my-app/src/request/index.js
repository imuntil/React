import axios from 'axios'
import store from '../store'
import { errorOccurred } from '@/actions/error-actions'

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
    if (data.code !== 1) {
      store.dispatch(errorOccurred(data.message))
      return Promise.reject(data.message)
    }
    return data.data
  },
  err => {
    console.error('__response__:', err.message)
    store.dispatch(errorOccurred(`${err.response.status}:${err.response.statusText}`))
    return Promise.reject(err)
  }
)

export default instance
export * from './user'
export * from './li'
