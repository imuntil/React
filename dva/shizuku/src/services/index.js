import request from '../utils/request'
import { store } from '../index'

let token = ''
const getToken = () => {
  if (!token) {
    token = store.getState().user.token
    return token
  }
  return token
}
const clearToken = () => {
  store.dispatch({ type: 'user/setUser', payload: {} })
  token = ''
}

const $ = async(url, options) => {
  const _token = getToken()
  const {res, err} = await request(`${prefix}${url}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${_token}`
    },
    ...options
  })
  if (err) {
    return { err }
  }
  if (res.code === 104) {
    clearToken()
    return { fail: res }
  }
  return res.code === 1 ? { data: res.data } : { fail: res }
}
const prefix = '/shizuku/'
export const login = async(email, password) => {
  return $('user/login', {
    method: 'POST',
    body: JSON.stringify({email, password})
  })
}
