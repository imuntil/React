const [PENDING, FULFILLED, REJECTED] = ['pending', 'fulfilled', 'rejected']
const thenable = (fn) => !!(fn && fn.then)
const callThen = (resolveCb, rejectCb, result) => {
  // thenable(result) ? result.then(cb) : cb(result)
  const canThen = thenable(result)
  return canThen ? result.then(resolveCb, rejectCb) : resolveCb(result)
}

const defaultResolve = (value) => value
const defaultReject = (reason) => reason

global.promiseCount = 0

class MyPromise {
  constructor(executor) {
    this.status = PENDING
    // 类似观察者模式
    this.resolveCbs = []
    this.rejectCbs = []
    // resolve 的结果
    this.value = null
    // reject 的结果
    this.reason = null

    const resolve = (value) => {
      if (this.status === PENDING) {
        // resolve 将 promise 状态变更为 fulfilled
        this.status = FULFILLED
        // 保存 resolve 结果
        this.value = value
        this.resolveCbs.forEach((cb) => cb())
      }
    }

    const reject = (reason) => {
      if (this.status === PENDING) {
        this.status = REJECTED
        this.reason = reason
        this.rejectCbs.forEach((cb) => cb())
      }
    }
    // new Promise((resolve, reject) => {})
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error.message)
    }
  }
  // import
  // then 可以链式调用，所以需要返回一个Promise
  // 因为 promise 的status 变成 fulfilled 或者 rejected 后，不能再次改变，所以只能返回一个 new Promise
  then(onResolve = defaultResolve, onReject = defaultReject) {
    return new MyPromise((nextResolve, nextReject) => {
      if (this.status === PENDING) {
        // 因为 promise 的 then 方法是在 resolve 或者 reject 之后才会执行，所以用队列来储存 onResolve, onReject 回调
        // 等到 executor 参数的 resolve 或者 reject 方法被调用时，会更改 status，并遍历执行对应的队列
        this.resolveCbs.push(() => {
          try {
            // -----------------------
            // 方便理解，这种写法只能对普通值的 value 起作用，对于 value 是一个 promise 的情况是不可行的
            // const value = onResolve(this.value)
            // nextResolve(value)
            // -----------------------
            // 而针对可能得到 promise 的情况
            // const value = onResolve(this.value)
            // if (value && value.then && typeof value.then === 'function') {
            //   // 此时 value 是一个 promise，则有如下的写法
            //   value.then(nextResolve, nextReject)
            // } else {
            //   nextResolve(value)
            // }
            // 简化一下
            callThen(nextResolve, nextReject, onResolve(this.value))
          } catch (error) {
            // 出错，错误会抛出，被接下来的一个 then 的 onRejct 捕获，或者说会作为接下来的第一个 then 的第二个函数参数 的参数
            nextReject(error)
          }
        })
        this.rejectCbs.push(() => {
          try {
            // // 注意，此时的参数为 reason
            // const reason = onReject(this.reason)
            // if (reason && reason.then && typeof reason.then === 'function') {
            //   // 注意，此处调用的为 nextResolve 方法
            //   reason.then(nextResolve, nextReject)
            // } else {
            //   nextResolve(reason)
            // }
            callThen(nextResolve, nextReject, onReject(this.reason))
          } catch (error) {
            nextReject(error)
          }
        })
      }
      // 处理 new Promise 直接 同步 resolve 的情况
      if (this.status === FULFILLED) {
        try {
          callThen(nextResolve, nextReject, onResolve(this.value))
        } catch (error) {
          nextReject(error)
        }
      }
      if (this.status === REJECTED) {
        try {
          callThen(nextResolve, nextReject, onReject(this.reason))
        } catch (error) {
          nextReject(error)
        }
      }
    })
  }
}

console.log('--------start----------')
new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(101)
    // throw new Error('gogogo')
    // reject('gogogo')
  }, 1000)
  // resolve(101)
})
  .then(
    (value) => {
      console.log('then1 ', value)
      return new MyPromise((resolve) => {
        setTimeout(() => {
          resolve(++value)
        }, 500)
      })
    },
    (reason) => console.log('then1.reject:', reason)
  )
  .then((value) => {
    console.log('then2 ', value)
    return ++value
  })
  .then(
    (value) => {
      console.log('then3', value)
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          // throw new Error('something wrong')
          reject('something wrong')
        }, 500)
      })
    },
    function reject3(reason) {
      console.log('then3---reject:', reason)
    }
  )
  .then(
    (value) => {
      console.log('then4 ', value)
      // return ++value
      return new MyPromise((resolve, reject) => {
        setTimeout(() => {
          resolve(++value)
          // reject('something wrong')
        }, 500)
      })
    },
    function reject4(reason) {
      console.log('then4---reject: ', reason)
      return 1000
    }
  )
  .then(
    (value) => {
      console.log('then5:', value)
      return ++value
    },
    function reject5(reason) {
      console.log('then5---reject:', reason)
    }
  )
console.log('--------end----------')
