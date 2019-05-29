function bubleSort(arr) {
  const len = arr.length
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
      }
    }
  }
  return arr
}

function bubleSort2(arr) {
  const len = arr.length
  let ii = len - 1
  while (ii > 0) {
    let pos = 0
    for (let j = 0; j < ii; j++) {
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        pos = j
      }
    }
    ii = pos
  }
}

class LazyManClass {
  constructor(name) {
    this.taskList = []
    this.name = name
    console.log(`Hi I am ${name}`)
    setTimeout(() => {
      this.next()
    }, 0)
  }
  next() {
    const fn = this.taskList.shift()
    fn && fn()
  }
  eat(food) {
    const fn = () => {
      console.log(`I am eating ${food}`)
      this.next()
    }
    this.taskList.push(fn)
    return this
  }
  sleep(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time * 1000)
    }
    this.taskList.push(fn)
    return this
  }
  sleepFirst(time) {
    const fn = () => {
      setTimeout(() => {
        console.log(`等待了${time}秒...`)
        this.next()
      }, time * 1000)
    }
    this.taskList.unshift(fn)
    return this
  }
}

// new LazyManClass('Tony')
//   .eat('lunch')
//   .eat('dinner')
//   .sleepFirst(5)
//   .sleep(4)
//   .eat('junk food')

class LazyMan {
  constructor(name) {
    console.log(`Hi I am ${name}`)
    this.taskList = []
    setTimeout(() => {
      this.start()
    }, 0)
  }
  eat(food) {
    this.taskList.push(() => {
      console.log(`I am eating ${food}`)
    })
    return this
  }
  delay(time) {
    return () => {
      return new Promise(resolve => {
        setTimeout(() => {
          console.log(`等待了${time}秒...`)
          resolve()
        }, time * 1000)
      })
    }
  }
  sleep(time) {
    this.taskList.push(this.delay(time))
    return this
  }
  sleepFirst(time) {
    this.taskList.unshift(this.delay(time))
    return this
  }
  async start() {
    for (let fn of this.taskList) {
      await fn()
    }
  }
}

// new LazyMan('Tony')
//   .eat('lunch')
//   .eat('dinner')
//   .sleepFirst(5)
//   .sleep(4)
//   .eat('junk food')

Promise.prototype._finally = function(callback) {
  const P = this.constructor
  return this.then(
    value => P.resolve(callback()).then(() => value),
    reason =>
      P.resolve(callback()).then(() => {
        throw reason
      })
  )
}

const origin = [2, 10, 3, 4, 5, 11, 10, 11, 20]
function parse(arr) {
  const s = new Set(arr)
  const m = {}
  for (let i of s) {
    const x = Math.floor(i / 10)
    const v = m[x] || (m[x] = [])
    v.push(i)
  }
  return Object.values(m)
}
// parse(origin)

const transformStr = str =>
  str.replace(
    /([A-Z]*)([a-z]*)/g,
    (oi, $1 = '', $2 = '') => $1.toLowerCase() + $2.toUpperCase()
  )

function match(S, T) {
  const lT = T.length
  const lS = S.length
  if (lT > lS) return -1
  for (i = 0; i <= lS - lT; i++) {
    if (S.substr(i, lT) === T) {
      return i
    }
  }
  return -1
}

console.log(match('ancdlwkdfhef', 'cdl'))

Function.prototype._call = function(context) {
  context = context || window
  context.fn = this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push('arguments[' + i + ']')
  }
  args.join(',')
  var res = eval('context.fn(' + args + ')')
  delete context.fn
  return res
}

Function.prototype._bind = function(context) {
  const _this = this
  return function() {
    _this.apply(context, arguments)
  }
}

function Promise_(fn) {
  let [value, state] = [null, 'pending']
  const [callbacks, _this] = [[], this]

  this.then = function(fulfilled, rejected) {
    return new Promise_(function(resolv, rejec) {
      try {
        if (state === 'pending') {
          callbacks.push(fulfilled)
          return
        }
        if (state === 'fulilled') {
          const data = fulfilled(value)
          resolv(data)
          return
        }
        if (state === 'rejected') {
          const data = rejected(value)
          resolv(data)
          return
        }
      } catch (error) {
        _this.catch(error)
      }
    })
  }

  this.catch = function(e) {
    console.log(JSON.stringify(e))
  }

  function resolve(v) {
    value = v
    state = 'fulfilled'
    execute()
  }

  function reject(v) {
    value = v
    state = 'rejected'
    execute()
  }

  function execute() {
    setTimeout(() => {
      callbacks.forEach(cb => {
        value = cb(value)
      })
    }, 0)
  }
  fn(resolve, reject)
}
