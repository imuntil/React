import md5 from 'md5'
import request from '../utils/request';
import { BASEURL, base } from '../constant'

const headers = {
  'Content-Type': 'application/json'
}
// 用户
export async function login({ phone, password }) {
  return request(`${base}users/login`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone, password: md5(password) })
  })
}
export async function verifyPhone({ phone }) {
  return request(`${base}users/is-exist?phone=${phone}`)
}
export async function getVerifyCode({ phone, flag = 1 }) {
  return request(`${base}users/code?phone=${phone}`)
}
export async function modifyNick({ phone, nickname }) {
  return request(`${BASEURL}updatenicknameUsr.action?phone=${phone}&nickname=${nickname}`)
}
export async function modifyAvatar({ uid, imgStr }) {
  return request(`${base}users/${uid}/avatar`, {
    method: 'PUT',
    headers,
    body: JSON.stringify({ imgStr })
  })
}
export async function register ({ phone, nick, password }) {
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
export async function fetchCollectionList({ userid }) {
  return request(`${BASEURL}selectUsrShoppingCartSct.action?flag=2&userid=${userid}`)
}
export async function addOrDelCollection({ uid, sku, type = 'add' }) {
  const url = type !== 'add'
    ? `${BASEURL}delcollectProSct.action?flag=2&proid=${id}&userid=${userid}`
    : `${BASEURL}insertShoppingCartSct.action?flag=2&pronum=0&id=${id}&userid=${userid}`
  return request(url)
}

// 订单
export async function fetchAllOrders({ userid }) {
  return request(`${BASEURL}selectOrderStatusOdr.action?flag=0&orderstatus=0&userid=${userid}`)
}
