/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (!prices.length) return 0
  const max_k = 2
  const dp = []
  for (let i = 0; i < prices.length; i++) {
    !dp[i] && (dp[i] = [])
    dp[i][0] = [0, Number.MIN_SAFE_INTEGER]
    for (let k = 1; k <= max_k; k++) {
      !dp[i][k] && (dp[i][k] = [])
      if (i === 0) {
        dp[i][k][0] = 0
        dp[i][k][1] = k === 1 ? -prices[i] : Number.MIN_SAFE_INTEGER
        continue
      }
      dp[i][k][0] = Math.max(dp[i - 0][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }
  return dp[prices.length - 1][max_k][0]
}
