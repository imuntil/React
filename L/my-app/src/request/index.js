import axios from 'axios'
import store from '../store'
import { errorOccurred } from '@/actions/error-actions'
import { loadingEnd } from '@/actions/loading-actions'

let bearer = ''
let bgmBearer = '311f94589465d2c873fadbf40dd3d016174c0c87'

const getToken = (my = true) => {
  return my
    ? bearer
      ? bearer
      : (bearer = localStorage.getItem('szk_token') || '')
    : bgmBearer
    ? bgmBearer
    : (bgmBearer = localStorage.getItem('bgm_token') || '')
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

const config = config => {
  const headers = config.headers
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`
    }
  }
}
const reqErr = err => {
  console.error('__request:', err.message)
  return Promise.reject(err)
}

const response = response => {
  const { data } = response
  if (data.code !== 1) {
    store.dispatch(errorOccurred(data.message))
    return Promise.reject(data.message)
  }
  return data.data
}

const resErr = err => {
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

instance.interceptors.request.use(config, reqErr)

instance.interceptors.response.use(response, resErr)

// {
//   "access_token": "311f94589465d2c873fadbf40dd3d016174c0c87",
//   "expires_in": 604800,
//   "token_type": "Bearer",
//   "scope": null,
//   "user_id": 443337,
//   "refresh_token": "cc99d385bffefee38d74f611bf70eb739a33f151"
// }

export const bgmi = axios.create({
  baseURL: '/ani',
  timeout: 5000
})

bgmi.interceptors.request.use(config => {
  const token = getToken(false)
  console.log(token)
  const headers = config.headers
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${getToken()}`
    }
  }
}, reqErr)
bgmi.interceptors.response.use(response => {
  return response.data
}, resErr)

export default instance
