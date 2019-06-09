function rotate(arr, k) {
  k = k % arr.length
  if (k === 0) return arr
  return arr.splice(arr.length - k).concat(arr)
}

Array(10000)
  .fill('')
  .map((v, i) => i)
  .filter(v => {
    return v.toString() === [...v.toString()].reverse().join('')
  })

// 示例:
// 输入: [0,1,0,3,12]
// 输出: [1,3,12,0,0]
// 说明:
// 必须在原数组上操作，不能拷贝额外的数组。
// 尽量减少操作次数。

function moveZero(arr = []) {
  let len = arr.length
  for (let i = 0; i < len; i++) {
    if (arr[i] === 0) {
      arr.splice(i, 1)
      arr.push(0)
      i--
      len--
    }
  }
}

function curry(fn, length) {
  const len = length || fn.length
  return function(...args) {
    return args.length >= len
      ? fn.apply(this, args)
      : curry(fn.bind(this, ...args), len - args.length)
  }
}

function curry2(fn) {
  const len = fn.length
  let args = []
  return function f(...rest) {
    args = args.concat(rest)
    return args.length >= len ? fn.apply(this, args) : f
  }
}

function flat1(arr) {
  // while (arr.some(v => Array.isArray(v))) {
  //   arr = [].concat(arr)
  // }
  // return arr
  return arr.reduce((pre, v) =>
    Array.isArray(v) ? [...pre, ...v] : [...pre, v]
  )
}

Function.prototype._call = function(context) {
  context = context || window
  context.fn = this
  var args = []
  for (let i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  var res = eval('context.fn(' + args.join(',') + ')')
  delete context.fn
  return res
}

Function.prototype._bind = function(context) {
  const _this = this
  return function() {
    _this.call(context, arguments)
  }
}

function traversal(node) {
  const children = node.childNodes || []
  children.forEach(v => {
    v.nodeType === 1 && traversal(v)
  })
}

function _new(P, ...rest) {
  const res = Object.create(P.prototype)
  const ret = P.call(res, ...rest)
  return ret instanceof Object ? ret : res
}

function unionBy(arr, key) {
  const res = []
  // [key] => index
  const map = {}
  arr.forEach(v => {
    const _key = v[key]
    if (map.hasOwnProperty(_key)) {
      res[map[_key]] = null
    }
    map[_key] = res.push(v) - 1
  })
  return res.filter(v => v)
}

function compose(...fns) {
  return fns.reduce((a, b) => (...args) => a(b(...args)))
}

function compose2(...fns) {
  return (...rest) => {
    let res = null
    while (fns.length) {
      const fn = fns.pop()
      res = fn(rest !== null ? rest : res)
      rest = null
    }
    return res
  }
}

const [FULFILLED, PENDING, REJECTED] = ['fulfilled', 'pending', 'rejected']
class MP {
  constructor(executor) {
    this.status = PENDING
    this.value = null
    this.reason = null
    this.resolveCbs = []
    this.rejectCbs = []

    const resolve = value => {
      if (this.status === PENDING) {
        this.status = FULFILLED
        this.value = value
        this.resolveCbs.forEach(fn => fn())
      }
    }
    const reject = reason => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCbs.forEach(fn => fn())
      }
    }

    setTimeout(() => {
      try {
        executor(resolve, reject)
      } catch (error) {
        reject(error)
      }
    }, 0)
  }

  then = (onResolve, onReject) => {
    return new MP((nextResolve, nextReject) => {
      if (this.status === PENDING) {
        this.resolveCbs.push(() => {
          try {
            const value = onResolve(this.value)
            if (value && value.then && typeof value.then === 'function') {
              value.then(nextResolve, nextReject)
            } else {
              nextResolve(value)
            }
          } catch (error) {
            nextReject(error)
          }
        })
        this.rejectCbs.push(() => {
          try {
            const reason = onReject(this.reason)
          } catch (error) {}
        })
      }
    })
  }
}

function cloneForce(source) {
  if (typeof source !== 'object' || source === null) return source
  const root = {}
  const hash = new WeakMap()
  const loop = [{ parent: root, key: undefined, data: source }]
  while (loop.length) {
    const { parent, key, data } = loop.pop()
    if (hash.has(data)) {
      parent[key] = hash.get(data)
      continue
    }
    let res = (parent[key] = Array.isArray(data) ? [] : {})
    if (key === undefined) {
      res = parent
    }
    hash.set(data, res)

    for (let k in data) {
      if (Object.prototype.hasOwnProperty.call(data, k)) {
        if (typeof data[k] === 'object' && data[k] !== null) {
          loop.push({ parent: res, key: k, data: data[k] })
        } else {
          res[k] = data[k]
        }
      }
    }
  }
  return root
}
