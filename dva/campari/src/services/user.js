import md5 from 'md5'
import request from '../utils/request';
import { BASEURL } from '../constant'

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
