export const thousandth = (str, decimal) => {
  let reg = /\d(?=(?:\d{3})+(?:\.\d+|$))/g
  return str.toFixed(2).replace(reg, (...rest) => rest[0] + ',')
}

export const currency = (str, $currency = '￥') => `${$currency} ${thousandth(str)}`

export const delay = time => new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, time)
})
