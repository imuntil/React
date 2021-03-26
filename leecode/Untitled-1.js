// 写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn, a, b) {
  let ix = 0
  let timer = null
  const genTime = () => {
    return a + b * ix++
  }
  const run = () => {
    timer = setTimeout(() => {
      fn()
      run()
    }, genTime())
  }
  const clear = () => {
    timer && clearTimeout(timer)
  }

  return {
    run,
    clear,
  }
}

// 合并二维有序数组成一维有序数组，归并排序的思路

// 斐波那契数列
// 0 1 1 2 3 5
function f1(n) {
  if (n < 2) return n
  return fn(n - 1) + fn(n - 2)
}

function f2(n) {
  const memo = [0, 1]
  function dp(n) {
    if (memo[n] !== undefined) return memo[n]
    memo[n] = dp(n - 1) + dp(n - 2)
    return memo[n]
  }
  return dp(n)
}

function* f3(n) {
  let [prev, cur] = [0, 1]
  for (let i = 0; i < n; i++) {
    yield cur
    ;[cur, prev] = [prev + cur, cur]
  }
}

function f4(n) {
  if (n < 2) return n
  let [prev, cur] = [0, 1]
  for (let i = 0; i < n; i++) {
    ;[cur, prev] = [prev + cur, cur]
  }
  return cur
}

// 字符串出现的不重复最长长度
