import md5 from 'md5'
import request from '../utils/request';
import { BASEURL, base } from '../constant'

// 用户
export async function login({ phone, password }) {
  return request(`${base}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
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
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ imgStr })
  })
}
export async function register ({ phone, nick, password }) {
  return request(`${base}users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ phone, password: md5(password), nick })
  })
}

// 地址
export async function adrList({ userid }) {
  return request(`${BASEURL}selectAddressAds.action?userid=${userid}`)
}
export async function setDefaultAdr({ userid, id }) {
  return request(`${BASEURL}updateAddressAds.action?id=${id}&userid=${userid}`)
}
export async function modifyAdr(payload) {
  return request(`${BASEURL}updateAddressOneAds.action`, {
    method: 'POST',
    body: payload
  })
}
export async function addAdr(payload) {
  return request(`${BASEURL}saveAddressAds.action`, {
    method: 'POST',
    body: payload
  })
}
export async function deleteAdr({ id }) {
  return request(`${BASEURL}delAddressAds.action?id=${id}`)
}

// 收藏
export async function fetchCollectionList({ userid }) {
  return request(`${BASEURL}selectUsrShoppingCartSct.action?flag=2&userid=${userid}`)
}
export async function addOrDelCollection({ userid, id, type = 'add' }) {
  const url = type !== 'add'
    ? `${BASEURL}delcollectProSct.action?flag=2&proid=${id}&userid=${userid}`
    : `${BASEURL}insertShoppingCartSct.action?flag=2&pronum=0&id=${id}&userid=${userid}`
  return request(url)
}

// 订单
export async function fetchAllOrders({ userid }) {
  return request(`${BASEURL}selectOrderStatusOdr.action?flag=0&orderstatus=0&userid=${userid}`)
}
