/**
 * @param {number} N
 * @return {number}
 */
var fib = function (N) {
  if (N === 0) return 0
  if (N === 1) return 1
  let [pre, cur] = [0, 1]
  for (let i = 2; i <= N; i++) {
    ;[cur, pre] = [cur + pre, cur]
  }
  return cur
}

var fib2 = function (N) {
  const memo = [0, 1]

  const helper = (n) => {
    if (memo[n] !== undefined) return memo[n]
    memo[n] = helper(n - 1) + helper(n - 2)
    return memo[n]
  }
  return helper(N)
}
;[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(fib2)
