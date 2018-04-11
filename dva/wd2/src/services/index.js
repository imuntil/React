import md5 from 'md5'
import request from '../utils/request'
import { formatFormData } from '../utils/cts'

// 115.28.239.3:8080/campariShop_Api/productShowPro.action?flag=1&sort=1

export const domain = 'http://115.28.239.3:8080/campariShop_Api/'
const staticAssets = 'http://115.28.239.3:8080/campariShop/upload/'
export const SA = staticAssets

/**
 * 接口全局异常捕获
 * @param url
 * @param options
 * @returns {Promise.<*>}
 * @returns { err, data, fail}
 * err: 接口失败
 * data: ok,数据正常
 * fail: 请求成功,但非期望数据
 */
export async function $(url, options) {
  const { err, data } = await request(`${domain}${url}`, options)
  if (err) {
    // store.commit({
    //   type: 'error',
    //   code: -1,
    //   msg: '未知错误'
    // })
    return { err: true }
  }
  const { resultcode: code, result, ...rest } = data
  if (+code !== 1 && +code !== 200) {
    // store.commit({ type: 'error', code, msg })
    return { fail: { code, msg: result } }
  }
  return { data: { code, result, ...rest } }
}

/**
 * 获取产品列表
 * @param {number} flag
 * @param {number} sort
 * @param {number} type
 * @returns {Promise} Promise
 */
export async function fetchProducts(flag = 1, sort = 1, type) {
  return $(`productShowPro.action?flag=${flag}&sort=${sort}&type=${type}`)
}

/**
 * 获取产品详细信息
 * @param {number} id
 * @returns {Promise} Promise
 */
export async function fetchProDetail(id) {
  return $(`productShowOnePro.action?id=${id}`)
}

/**
 * 获取推荐产品
 * @param {number} type
 * @returns {Promise} Promise
 */
export async function fetchRecommend(type) {
  return $(`productTypeShowPro.action?type=${type}`)
}

/**
 * 登录
 * @param {*} {phone, password}
 */
export async function login({ phone, password }) {
  return $(`loginUsersUsr.action?password=${md5(password)}&phone=${phone}`)
}

/**
 * 获取验证码
 * @param {object} [obj]
 */
export async function getCode({ phone, flag = 1 }) {
  return $(`resIdcodeSsm.action?flag=${flag}&phone=${phone}`)
}

/**
 * 手机号码是否已被注册
 * @param {string} phone
 */
export async function isExist(phone) {
  return $(`seluserPhoneUsr.action?phone=${phone}`)
}

/**
 * 注册
 * @param {string} nick string
 * @param {string} password string
 * @param {string} phone string
 */
export async function register({ nick, password, phone }) {
  return $(
    `userRegsUsr.action?nickname=${nick}&password=${md5(
      password
    )}&phone=${phone}`
  )
}

/**
 * 修改密码
 * @param {*} pwd 密码
 * @param {*} phone 手机号码
 */
export async function modifyPwd({ pwd, phone }) {
  return $(`userForgetUsr.action?newpwd=${md5(pwd)}&phone=${phone}`)
}

/**
 * 获取用户地址列表
 * @param {string} userID 用户id
 */
export async function fetchAdrList(userID) {
  return $(`selectAddressAds.action?userid=${userID}`)
}

/**
 * 修改默认地址
 * @param {string} id 地址 id
 * @param {string} userID 用户 userID
 */
export async function toggleDefaultAdr({ id, userID }) {
  return $(`updateAddressAds.action?id=${id}&userid=${userID}`)
}

/**
 * 删除地址
 * @param {string} id 地址id
 */
export async function delAdr(id) {
  return $(`delAddressAds.action?id=${id}`)
}

/**
 * 新增地址
 * @param {object} payload 内容 {status, label, city, name, phone, address, userid}
 */
export async function addAdr(payload) {
  return $(`saveAddressAds.action`, {
    method: 'POST',
    body: formatFormData(payload)
  })
}

/**
 * 更新地址
 * @param {object} payload 更新内容 {..., id}
 */
export async function updateAdr(payload) {
  return $(`updateAddressOneAds.action`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' },
    // body: JSON.stringify(payload)
    body: formatFormData(payload)
  })
}
