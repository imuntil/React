import md5 from 'md5'
import request from '../utils/request'

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
  const { resultcode: code, result } = data
  if (+code !== 1 && +code !== 200) {
    // store.commit({ type: 'error', code, msg })
    return { fail: { code, msg: result } }
  }
  return { data: { code, result } }
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
 * @param {string} {phone, password}
 */
export async function login({ phone, password }) {
  return $(`loginUsersUsr.action?password=${md5(password)}&phone=${phone}`)  
}