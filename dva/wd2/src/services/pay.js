import { wxPay as wp } from './index'

/**
 * 调取微信支付api
 * @param {object} params
 * @param {boolean} mock 模拟
 */
function chooseWXPay(params, mock = false) {
  return new Promise((resolve, reject) => {
    if (mock) {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve() : reject()
      }, 500)
    } else {
      Window.WeixinJSBridge.invoke('getBrandWCPayRequest', params, res => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve(true)
        } else {
          reject('支付失败')
        }
      })
    }
  })
}

/**
 * 支付
 * @param {string} openID openid
 * @param {string} orderNum 订单号
 * @param {number} money 金额
 * @param {boolean} mock 模拟微信支付
 */
export async function wxPay(openID, orderNum, money, mock = false) {
  try {
    const params = await fetchWxPayParams(openID, orderNum, money)
    if (typeof window.WeixinJSBridge === 'undefined') {
      return new Promise(resolve => {
        document.addEventListener(
          'WeixinJSBridgeReady',
          () => {
            resolve(chooseWXPay(params))
          },
          false
        )
        if (mock) {
          setTimeout(() => {
            resolve(chooseWXPay(params, true))
          }, 500)
        }
      })
    } else {
      return chooseWXPay(params)
    }
  } catch (e) {
    throw e
  }
}

/**
 * 获取微信支付所需信息
 * @param {string} openID openid
 * @param {string} orderNum 订单号
 * @param {number} money 金额
 */
export async function fetchWxPayParams(openID, orderNum, money) {
  const order = {
    WIDout_trade_no: orderNum,
    WIDsubject: 'Campari',
    WIDtotal_fee: money,
    WIDbody: '-',
    openid: openID
  }
  /* 获取支付所需的信息 */
  const { data, fail } = await wp(order)
  if (!data) {
    throw new Error((fail && fail.msg) || '出错了，请稍后再试')
  }
  const params = { ...data.result }
  if (!params.packge) {
    params.packge = params.prepay_id
    delete params.prepay_id
  }
  return params
}

// function abc () {
//   return new Promise((resolve, reject) => {
//     console.log('abc')
//     const v = Math.random()
//     v > 0.5 ? resolve(v) : reject(v)
//   })
// }
// function test () {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       console.log('test')
//       resolve(abc())
//     }, 500)
//   })
// }
// function run () {
//   console.time('t')
//   test().then(v => {
//     console.log('then:', v)
//     console.timeEnd('t')
//   }).catch(v => {
//     console.log('catch:', v)
//     console.timeEnd('t')
//   })
// }

// run()
