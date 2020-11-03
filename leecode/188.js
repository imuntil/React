/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */

/**
 * k = -infinity
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 由于k = +infinity
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k][0] - prices[i])
 * 可以理解为状态k可忽略
 * dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
 * dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices[i])
 */
var maxProfit_infinit_k = function (prices) {
  let [dp_i0, dp_i1] = [0, -prices[0]]
  for (let i = 0; i < prices.length; i++) {
    const temp = dp_i0
    dp_i0 = Math.max(dp_i0, dp_i1 + prices[i])
    dp_i1 = Math.max(dp_i1, temp - prices[i])
  }
  return dp_i0
}

var maxProfit = function (k, prices) {
  if (!prices.length) return 0
  if (k <= 0) return 0
  if (k > prices.length / 2) {
    return maxProfit_infinit_k(prices)
  }
  const dp = []
  for (let i = 0; i < prices.length; i++) {
    !dp[i] && (dp[i] = [])
    for (let j = 0; j <= k; j++) {
      !dp[i][j] && (dp[i][j] = [])
      if (i === 0) {
        dp[i][j][0] = 0
        dp[i][j][1] = -prices[i]
        continue
      }
      if (j === 0) {
        dp[i][j][0] = 0
        dp[i][j][1] = Number.MIN_SAFE_INTEGER
        continue
      }
      dp[i][j][0] = Math.max(dp[i - 1][j][0], dp[i - 1][j][1] + prices[i])
      dp[i][j][1] = Math.max(dp[i - 1][j][1], dp[i - 1][j - 1][0] - prices[i])
    }
  }
  return dp[prices.length - 1][k][0]
}
