// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
/**
 * @param {number[]} prices
 * @return {number}
 * 状态转移方程
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-2][k-1][0] - prices[i])
 * 由于冷冻期的存在，第i天买入股票，需要从第i-2天转移状态
 * k没有限制
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-2][k][0] - prices[i])
 */
var maxProfit = function (prices) {
  if (!prices.length) return 0
  let [dp_i0, dp_i1] = [0, -prices[0]]
  let dp_pre = 0
  for (let i = 0; i < prices.length; i++) {
    const temp = dp_i0
    dp_i0 = Math.max(dp_i0, dp_i1 + prices[i])
    dp_i1 = Math.max(dp_i1, dp_pre - prices[i])
    dp_pre = temp
  }
  return dp_i0
}
