function all(arr) {
  const res = []
  const choose = (sub) => {
    if (sub.length === arr.length) {
      res.push([...sub])
      return
    }
    for (let i = 0; i < arr.length; i++) {
      if (sub.indexOf(arr[i]) === -1) {
        sub.push(arr[i])
        choose(sub)
        sub.pop()
      }
    }
  }
  choose([])
  console.log(res)
}

all([1, 2, 3])

function all2(arr) {
  const choose = (sub, item) => {
    if (!sub.length) return [[item]]
    const res = choose(sub.slice(0, -1), sub[sub.length - 1])
    const temp = []
    for (let i = 0; i < res.length; i++) {
      const subArr = res[i]
      for (let j = 0; j <= subArr.length; j++) {
        const t = [...subArr[j]]
        t.splice(i, 0, item)
      }
    }
    return temp
  }
}
