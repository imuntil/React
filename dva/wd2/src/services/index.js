import md5 from 'md5'
import request from '../utils/request'
import {toFormData} from '../utils/cts'
import CryptoJS from 'crypto-js'
const {
  mode: {
    ECB
  },
  pad: {
    Pkcs7
  },
  enc: {
    Utf8,
    Base64
  },
  DES
} = CryptoJS
const k = Utf8.parse('12345678901czzwejwuehhd4565545')
const {encrypt, decrypt} = DES

/* des 加密 */
const e = v => {
  v = JSON.stringify(v)
  if (!v) 
    return ''
  const en = encrypt(v, k, {
    mode: ECB,
    padding: Pkcs7
  })
  return en.toString()
}

/* des 解密 */
const d = v => {
  const decrypted = decrypt({
    ciphertext: Base64.parse(v)
  }, k, {
    mode: ECB,
    padding: Pkcs7
  })
  return decrypted.toString(Utf8)
}

export const decode = d

export const domain = 'http://115.28.239.3:8080/campariShop_Api/'
// export const dm2 = 'http://192.168.2.125:8080/campariCRM_U1/'
export const dm2 = 'http://api.jtuntech.com:8080/campariCRM_U1/'
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
export async function $(url, options, $new = false) {
  const {err, data} = await request(`${$new
    ? dm2
    : domain}${url}`, options)
  if (err) {
    // store.commit({ type: 'error' })
    return {err: true}
  }
  let {
    resultcode,
    code,
    result,
    data: res,
    ...rest
  } = data
  /* 旧接口 */
  if (code === undefined) {
    code = +resultcode
    if (code !== 1 && code !== 200) {
      return {
        fail: {
          code,
          msg: result
        }
      }
    }
    return {
      data: {
        code,
        result,
        ...rest
      }
    }
  }
  /* 新接口 */
  if (+ code !== 200) {
    return {
      fail: {
        code,
        ...rest
      }
    }
  }
  return {
    data: {
      code,
      result: JSON.parse(d(res)),
      ...rest
    }
  }
}

export async function $$(url, options) {
  return $(url, options, true)
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
export async function login({phone, password}) {
  return $(`loginUsersUsr.action?password=${md5(password)}&phone=${phone}`)
}

/**
 * 获取验证码
 * @param {object} [obj]
 */
export async function getCode({
  phone,
  flag = 1
}) {
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
export async function register({nick, password, phone}) {
  return $(`userRegsUsr.action?nickname=${nick}&password=${md5(password)}&phone=${phone}`)
}

/**
 * 修改密码
 * @param {*} pwd 密码
 * @param {*} phone 手机号码
 */
export async function resetPwd({pwd, phone}) {
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
export async function toggleDefaultAdr({id, userID}) {
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
    body: toFormData(payload)
  })
}

/**
 * 更新地址
 * @param {object} payload 更新内容 {..., id}
 */
export async function updateAdr(payload) {
  return $(`updateAddressOneAds.action`, {
    method: 'POST',
    // headers: { 'Content-Type': 'application/json' }, body:
    // JSON.stringify(payload)
    body: toFormData(payload)
  })
}

/**
 * 修改密码
 * @param {object} nPwd.oPwd.phone string
 */
export async function modifyPwd({nPwd, oPwd, phone}) {
  return $(`updatepwdrUsr.action?newpwd=${md5(nPwd)}&oldpwd=${md5(oPwd)}&phone=${phone}`)
}

/**
 * 修改昵称
 * @param {object} nick.phone string.string
 */
export async function modifyNick({nick, phone}) {
  return $(`updatenicknameUsr.action?nickname=${nick}&phone=${phone}`)
}

/**
 *  修改头像
 * @param {object} payload phone, imgfile
 */
export async function modifyAvatar(payload) {
  return $(`uploadImgUsr.action`, {
    method: 'POST',
    body: toFormData(payload)
  })
}

/**
 * 获取购物车或用户收藏 cart || collection
 * @param {object} flag.userID string.string
 */
export async function fetchUserC({
  flag = 2,
  userID
}) {
  return $(`selectUsrShoppingCartSct.action?flag=${flag}&userid=${userID}`)
}

/**
 * 获取产品是否被用户收藏
 * @param {object} id.userID string.string 产品 id 和用户 id
 */
export async function ifLike({id, userID}) {
  return $(`selcollectProSct.action?flag=2&proid=${id}&userid=${userID}`)
}

/**
 * 删除用户收藏 collection
 * @param {object} flag.proID.userID string.string.string
 */
export async function deleteUserC({proID, userID}) {
  return $(`delcollectProSct.action?flag=2&proid=${proID}&userid=${userID}`)
}

/**
 * toggle 收藏状态
 * @param {object} param0 {proID, userID, nextStatus: boolean}
 */
export async function toggleLike({proID, userID, nextStatus}) {
  return $(nextStatus
    ? `insertShoppingCartSct.action?flag=2&id=${proID}&pronum=0&userid=${userID}`
    : `delcollectProSct.action?flag=2&proid=${proID}&userid=${userID}`)
}

/**
 * 删除购物车中商品
 * @param {object} cid.flag string.string 购物车商品id
 */
export async function deleteCartPro({
  cid,
  flag = 1
}) {
  return $(`delShoppingCartSct.action?cid=${cid}&flag=${flag}`)
}

/**
 * 添加购物车
 * @param {object} proID.userID
 */
export async function addToCart({proID, userID}) {
  return $(`insertShoppingCartSct.action?flag=1&id=${proID}&pronum=1&userid=${userID}`)
}

/**
 * 修改购物车中的商品数量
 * @param {object} cid.num 购物车商品 id，数量
 */
export async function updateCartNum({cid, num}) {
  return $(`updateShopCartNumSct.action?cid=${cid}&flag=1&pronum=${num}`)
}

/**
 * 下单
 * @param {object} order
 * userid,
 * prolist,
 * pronumlist,
 * orderaddress,
 * orderphone,
 * express： 运费
 * consognee： 收货人姓名
 * code: y | n 是否使用优惠券
 * Openid
 */
export async function placeOrder(order) {
  console.log(order)
  return $(`saveOrderOdr.action`, {
    method: 'POST',
    body: toFormData(order)
  })
}

/**
 * 判断用户是否可以使用优惠券
 * @param {string} openID
 */
export async function able2UseCoupon(openID) {
  return $(`selVoucherByOpenidUsr.action?Openid=${openID}`)
}

/**
 * 微信支付
 * @param {object} order
 * WIDout_trade_no: 订单号
 * WIDsubject: Campari
 * WIDtotal_fee: 1
 * WIDbody: ..
 * openid:
 */

export async function wxPay(order) {
  return $(`weixingongzWnc.action`, {
    method: 'POST',
    body: toFormData(order)
  })
}

/**
 * 订单列表
 * @param {object} flag.status.userID string.string.string flag，订单状态，用户id
 */
export async function fetchOrderList({
  flag = 0,
  status = 0,
  userID
}) {
  return $(`selectOrderStatusOdr.action?flag=${flag}&orderstatus=${status}&userid=${userID}`)
}

/**
 * 获取用户优惠券
 * @param {object} param0
 * status
 * 0: 未使用
 * 1： 已使用
 */
export async function fetchCoupons({
  userID,
  phone,
  status = 0
}) {
  return $$(`user/findUserAllCoup?usersid=${e(userID)}&phone=${e(+ phone)}&exchange=${e(status)}`)
}

/**
 * 使用优惠券
 * @param {string} conpId 优惠券id
 * @param {string} mctId
 * @param {number} exchange 0未领取，1未使用，2已使用，3失效，
 */
export async function useCoupon(conpId, mctId, exchange = 2) {
  return $$(`user/update`, {
    method: 'POST',
    body: toFormData({conpId, mctId, exchange})
  })
}

/**
 * 查询用户积分
 * @param {string} phone
 */
export async function fetchUserPoints(phone) {
  return $$(`user/findScoreCount?phone=${e(+ 15036269646)}`)
}

/**
 * 获取积分产品
 */
export async function fetchPointsPros() {
  return $$(``)
}

/**
 *
 * @param {string} id 产品id
 */
export async function fetchPPDetail(id) {
  return $$(`${e(id)}`)
}