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
