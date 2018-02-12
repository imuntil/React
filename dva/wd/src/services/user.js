import md5 from 'md5'
import request from '../utils/request'
import { BASEURL, base } from '../constant'

const headers = {
  'Content-Type': 'application/json'
}
// 用户
export async function login({ phone, password }) {
  return request(`${base}users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone, password: password })
  })
}
export async function verifyPhone({ phone }) {
  return request(`${base}users/is-exist?phone=${phone}`)
}
export async function getVerifyCode({ phone, flag = 1 }) {
  return request(`${base}users/code?phone=${phone}`)
}
export async function modifyNick({ uid, nick }) {
  return request(`${base}users/${uid}/nick`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ nick })
  })
}
export async function modifyAvatar({ uid, imgStr }) {
  return request(`${base}users/${uid}/avatar`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ imgStr })
  })
}
export async function modifyPassword({ uid, np, op }) {
  return request(`${base}users/${uid}/password`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ op, np })
  })
}
export async function register({ phone, nick, password }) {
  return request(`${base}users/register`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone, password: md5(password), nick })
  })
}

// 地址
export async function adrList({ uid }) {
  return request(`${base}users/${uid}/adrs`)
}
export async function setDefaultAdr({ uid, aid }) {
  return request(`${base}users/${uid}/adrs/default/${aid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ isDefault: 0 })
  })
}
export async function modifyAdr({ uid, aid, ...rest }) {
  return request(`${base}users/${uid}/adrs/${aid}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(rest)
  })
}
export async function addAdr({ uid, ...rest }) {
  return request(`${base}users/${uid}/adrs/add`, {
    method: 'POST',
    headers,
    body: JSON.stringify(rest)
  })
}
export async function deleteAdr({ uid, aid }) {
  return request(`${base}users/${uid}/adrs/${aid}`, {
    method: 'DELETE'
  })
}

// 收藏
export async function fetchCollectionList({ uid }) {
  return request(`${base}users/${uid}/like`)
}
export async function addOrDelCollection({ uid, sku, type = 'add' }) {
  return request(`${base}users/${uid}/like`, {
    method: type === 'add' ? 'PUT' : 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sku })
  })
}

// 订单
export async function fetchAllOrders({ uid }) {
  return request(`${base}users/${uid}/order`)
}
