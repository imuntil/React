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

export const scrollTo = (el, to = 0, duration = 500) => {
  let st = el.scrollTop
  const delta = (st - to) / (duration / 25)
  function ani () {
    if (st > to && el) {
      st -= delta
      el.scrollTop = st >= 0 ? st : 0
      requestAnimationFrame(ani)
    }
  }
  requestAnimationFrame(ani)
}