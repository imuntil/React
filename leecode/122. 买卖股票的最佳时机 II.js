/**
 * @param {number[]} prices
 * @return {number}
 */
// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-ii/

// dp[i][k][0] = Math.max(dp[i][k][0], dp[i][k][1] + prices[i])
// dp[i][k][1] = Math.max(dp[i][k][1], dp[i][k-1][0] - prices[0])

var maxProfit = function (prices) {
  if (!prices.length) return 0
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    const temp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, temp - prices[i])
  }
  return dp_i_0
}
