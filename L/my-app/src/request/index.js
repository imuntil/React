import axios from 'axios'
import store from '../store'
import { errorOccurred } from '@/actions/error-actions'
import { loadingEnd } from '@/actions/loading-actions'

let bearer = ''

const getToken = () => {
  return bearer ? bearer : (bearer = localStorage.getItem('szk_token') || '')
}

/**
 * 清除token
 */
export const clearToken = () => {
  bearer = ''
  localStorage.removeItem('szk_token')
}

/**
 * 设置token
 * @param {string} token
 */
export const setToken = token => {
  bearer = token
  localStorage.setItem('szk_token', token)
}

const instance = axios.create({
  baseURL: '/shizuku/',
  timeout: 15000
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
    const __type = err.config.action
    if (/^REQUEST_/.test(__type)) {
      store.dispatch(loadingEnd(`loading@${__type.replace('REQUEST_', '')}`))
    }
    if (err.response) {
      store.dispatch(
        errorOccurred(`${err.response.status}:${err.response.statusText}`)
      )
      err.response.status === 401 && window.location.replace('/login')
    } else if (err.request) {
      store.dispatch(errorOccurred(`网络连接异常，请检查您的网络`))
    } else {
      store.dispatch(errorOccurred(err.message || '系统处理异常，请稍后重试'))
    }

    return Promise.reject(err)
  }
)

export default instance
