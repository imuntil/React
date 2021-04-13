const promiseAll = (promises) => {
  return new Promise((resolve, reject) => {
    const res = []
    const len = promises.length
    let count = 0
    promises.forEach((p, ix) => {
      p.then((x) => {
        res[ix] = x
        count++
        if (count === len) {
          resolve(res)
        }
      }, reject)
    })
  })
}

const promiseAllSi = (promises) => {
  return new Promise((resolve) => {
    const res = []
    const len = promises.length
    let count = 0
    promises.forEach((p, ix) => {
      p.then(
        (x) => {
          res[ix] = x
          count++
        },
        (r) => {
          res[ix] = null
          count++
        }
      ).finally(() => {
        if (count === len) {
          resolve(res)
        }
      })
    })
  })
}

const f1 = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('abc')
    }, 1000);
  })
}

const f2 = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('xyz')
    }, 100);
  })
}

promiseAllSi([f1(), f2()]).then(res => {
  console.log(`res`, res)
})