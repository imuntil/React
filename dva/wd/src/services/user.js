import md5 from 'md5'
import request from '../utils/request';
import { BASEURL } from '../constant'

// 用户
export async function login({ phone, password }) {
  return request(`${BASEURL}loginUsersUsr.action?phone=${phone}&password=${md5(password)}`)
}
export async function verifyPhone({ phone }) {
  return request(`${BASEURL}seluserPhoneUsr.action?phone=${phone}`)
}
export async function getVerifyCode({ phone, flag = 1 }) {
  return request(`${BASEURL}resIdcodeSsm.action?phone=${phone}&flag=${flag}`)
}
export async function modifyNick({ phone, nickname }) {
  return request(`${BASEURL}updatenicknameUsr.action?phone=${phone}&nickname=${nickname}`)
}
export async function modifyAvatar(posts) {
  return request(`${BASEURL}uploadImgUsr.action`, {
    method: 'POST',
    body: posts
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
