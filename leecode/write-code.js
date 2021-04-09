function flat(arr) {
  return [].concat(...arr.map((v) => (Array.isArray(v) ? flat(v) : v)))
}

class EventEmitter {
  constructor() {
    this.queue = {}
  }

  on(event, handler) {
    if (this.queue[event]) {
      this.queue[event].push(handler)
    } else {
      this.queue[event] = [handler]
    }
  }

  off(event, handler) {
    const q = this.queue[event]
    if (!q) return
    if (!handler) {
      this.queue[event] = []
    }
    const ix = q.findIndex((v) => v === handler)
    if (ix >= 0) {
      q.splice(ix, 1)
    }
  }

  emit(event, ...args) {
    const handler = this.queue[event]
    if (!handler) return
    handler.forEach((fn) => fn(...args))
  }
}

function parseUrl(url) {
  // const search = /.+\?(.+)$/.exec(url)[1]
  const search = url.split('?')[1]
  if (!search) return {}
  const searchArr = search.split('&')
  const res = {}
  searchArr.forEach((str) => {
    if (/=/.test(str)) {
      let [key, val] = str.split('=')
      val = decodeURIComponent(val)
      if (res.hasOwnProperty(key)) {
        res[key] = [].concat(res[key], val)
      } else {
        res[key] = val
      }
    } else {
      res[key] = true
    }
  })

  return res
}

function debounce(fn, timer) {
  let st
  return function (...args) {
    const context = this
    if (st) {
      clearTimeout(st)
    }
    st = setTimeout(() => {
      fn.call(context, ...args)
      st = null
    }, timer)
  }
}

function throttle(fn, wait, immediately) {
  let runImme = immediately
  let pre = Date.now()
  return function(...args) {
    const context = this
    const now = Date.now()
    if (runImme) {
      fn.call(context, ...args)
      pre = now
      runImme = false
      return
    }
    if (now - pre >= wait) {
      fn.call(context, ...args)
      pre = now
    }
  }
}


function curry(fn, len) {
  const size = len || fn.length
  let arr = []
  const temp = (...args) => {
    arr = [...arr, ...args]
    if (arr.length === size) return fn(...arr)
    return temp
  }
  return temp
}

function curry2(fn, len, holder) {
  const size = len || fn.length;
  let arr = Array(size).fill(holder)
  const temp = (...args) => {

    // const start = arr.findIndex(v => v === holder)
    // args.forEach((v, ix) => {

    // })
    let j = 0
    for (let i = 0; i < size; i++) {
      if (arr[i] !== holder) continue
      arr[i] = args[j++]
    }

    if (arr.every(v => v !== holder)) {
      return fn(...arr)
    }
    return temp
  }
  return temp
}