/**
 * @param {number[]} prices
 * @return {number}
 */

var maxProfit = function (prices) {
  if (!prices.length) return 0
  const dp = []
  for (let i = 0; i < prices.length; i++) {
    !dp[i] && (dp[i] = [])
    if (i === 0) {
      dp[i][0] = 0
      dp[i][1] = -prices[i]
      continue
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
  }
  return dp[prices.length - 1][0]
}

maxProfit = function (prices) {
  if (!prices.length) return 0
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, -prices[i])
  }
  return dp_i_0
}
