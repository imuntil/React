function flat(arr) {
  return [].concat(...arr.map((v) => (Array.isArray(v) ? flat(v) : v)))
}

function un(arr) {
  return arr.filter((v, ix, arr) => {
    return arr.indexOf(v) === ix
  })
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
  return function (...args) {
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
  const size = len || fn.length
  let arr = Array(size).fill(holder)
  const temp = (...args) => {
    let j = 0
    // debugger
    for (let i = 0; i < size; i++) {
      if (j === args.length) break
      if (arr[i] !== holder) continue
      arr[i] = args[j++]
    }
    // console.log(arr.join('-'))

    if (arr.every((v) => v !== holder)) {
      return fn(...arr)
    }
    return temp
  }
  return temp
}

function testCurry2() {
  function fn2(a, b, c, d, e) {
    console.log([a, b, c, d, e])
  }

  let _fn
  let _ = 'xx'
  _fn = curry2(fn2, 5, _)
  _fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
  _fn = curry2(fn2, 5, _)
  _fn(_, 2, 3, 4, 5)(1) // print: 1,2,3,4,5
  _fn = curry2(fn2, 5, _)
  _fn(1, _, 3, 4, 5)(2) // print: 1,2,3,4,5
  _fn = curry2(fn2, 5, _)
  _fn(1, _, 3)(_, 4, _)(2)(5) // print: 1,2,3,4,5
  _fn = curry2(fn2, 5, _)
  _fn(1, _, _, 4)(_, 3)(2)(5) // print: 1,2,3,4,5
  _fn = curry2(fn2, 5, _)
  _fn(_, 2)(_, _, 4)(1)(3)(5) // print: 1,2,3,4,5

  function add(x, y, z) {
    return x + y + z
  }
  let _add
  _add = curry2(add)
  console.log(_add(1)(2, 3))
  _add = curry2(add)
  console.log(_add(1)(2)(4))
  _add = curry2(add)
  console.log(_add(1, 5)(2))
}

testCurry2()

Function.prototype.myCall = function (thisArg, ...rest) {
  if (thisArg === null || thisArg === undefined) {
    thisArg = window
  } else {
    thisArg = Object(thisArg)
  }
  const key = Symbol('this')
  thisArg[key] = this
  const res = thisArg[key](...rest)
  delete thisArg[key]
  return res
}

Function.prototype.myBind = function (thisArg, ...rest) {
  const self = this
  const fN = function () {}
  const fBound = function (...args) {
    return self.apply(this instanceof fN ? this : thisArg, [...rest, ...args])
  }
  fN.prototype = this.prototype
  fBound.prototype = new fN()
  return fBound
}

function myNew(con, ...rest) {
  const obj = Object.create(con.prototype)
  const res = con.call(obj, ...rest)
  return res && typeof res === 'object' ? res : obj
}

function myCreate(proto) {
  const F = function () {}
  F.prototype = proto
  return new F()
}

function clone(source) {
  const isObject = value => {
    return typeof value === 'object' && value !== null
  }

  const root = {}
  const hash = new WeakMap()
  const loopList = [{ parent: root, key: undefined, data: source }]
  while (loopList.length) {
    const { parent, key, data } = loopList.shift()
    if (hash.has(data)) {
      parent[key] = hash.get(data)
      continue
    }
    let res = parent
    if (key !== undefined) {
      res = Array.isArray(data) ? [] : {}
      parent[key] = res
    }
    hash.set(data, res)
    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (isObject(data[k])) {
          loopList.push({ parent: res, key: k, data: data[k] })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}
