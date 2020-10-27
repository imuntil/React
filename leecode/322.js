/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  const memo = [0]
  function dp(n) {
    if (n < 0) return -1
    if (memo[n] !== undefined) return memo[n]
    let res = amount + 1
    for (const c of coins) {
      const subproblem = dp(n - c)
      if (subproblem === -1) continue
      res = Math.min(res, 1 + subproblem)
    }
    memo[n] = res === amount + 1 ? -1 : res
    return memo[n]
  }
  return dp(amount)
}

var coinChange2 = function (coins, amount) {
  const dp = Array(amount + 1).fill(amount + 1)
  dp[0] = 0
  for (let i = 1; i < dp.length; i++) {
    for (const c of coins) {
      if (i - c < 0) continue
      dp[i] = Math.min(dp[i], 1 + dp[i - c])
    }
  }
  return dp[amount] === amount + 1 ? -1 : dp[amount]
}
