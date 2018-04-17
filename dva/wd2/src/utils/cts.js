/**
 * 千分符
 * @param {string} str 数字
 * @param {*} decimal
 */
export const thousandth = (str, decimal) => {
  let reg = /\d(?=(?:\d{3})+(?:\.\d+|$))/g
  return str.toFixed(2).replace(reg, (...rest) => rest[0] + ',')
}

/**
 * 数字货币格式化
 * @param {string | number} str 金额
 * @param {string} $currency 货币符
 */
export const currency = (str, $currency = '￥') =>
  `${$currency}${thousandth(str)}`

/**
 * 延时
 * @param {number} time delay时间
 */
export const delay = time =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, time)
  })

/**
 * 滚动到
 * @param {HTMLElement} el dom节点
 * @param {number} to 滚动到
 * @param {number} duration 时间
 */
export const scrollTo = (el, to = 0, duration = 500) => {
  let st = el.scrollTop
  const delta = (st - to) / (duration / 25)
  function ani() {
    if (st > to && el) {
      st -= delta
      el.scrollTop = st >= 0 ? st : 0
      requestAnimationFrame(ani)
    }
  }
  requestAnimationFrame(ani)
}

/**
 * 常用正则
 */
export const regs = {
  phone: { str: '^(1[3|4|5|7|8])[0-9]{9}$', reg: /^(1[3|4|5|7|8])[0-9]{9}$/ },
  password: { str: '^[A-z0-9_]{6,20}$', reg: /^[A-z0-9_]{6,20}$/ },
  code: { str: '^[0-9]{6}$', reg: /^[\d]{6}$/ },
  objectId: { reg: /^[0-9a-fA-F]{24}$/ }
}

/**
 * 格式为FormData
 * @param {object} form 需要格式化的对象
 */
export function formatFormData(form = {}) {
  const formData = new FormData()
  if (Object.prototype.toString.call(form) !== '[object Object]') {
    return formData
  }
  for (const key in form) {
    if (form.hasOwnProperty(key) && form[key] !== undefined) {
      formData.append(key, form[key])
    }
  }
  return formData
}

/**
 * 将search字符串转为对象
 * @param {string} search search 字符串  eg. ?id=11&xx=22
 */
export function formatSearch(search) {
  let q = search || window.location.search
  q = decodeURIComponent(q.substring(1) || '')
  const obj = {}
  q &&
    q.split('&').forEach(v => {
      const [key, value] = v.split('=')
      obj[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  return obj
}
