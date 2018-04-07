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

// project common tools
export const regs = {
	phone: { str: '^(1[3|4|5|7|8])[0-9]{9}$', reg: /^(1[3|4|5|7|8])[0-9]{9}$/ },
	password: { str: '^[A-z0-9_]{6,20}$', reg: /^[A-z0-9_]{6,20}$/ },
	code: { str: '^[0-9]{6}$', reg: /^[\d]{6}$/ },
	objectId: { reg: /^[0-9a-fA-F]{24}$/ }
}
