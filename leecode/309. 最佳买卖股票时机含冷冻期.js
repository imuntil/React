// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/
/**
 * @param {number[]} prices
 * @return {number}
 * 状态转移方程
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 
 * if (cooldown) {
 *  dp[i][k][1] = dp[i-1][k][1]
 *  cooldown = false
 * }
 * 
 * if (dp[i-1][k][0] < dp[i-1][k][1] + prices[i]) {
 *  dp[i][k][0] = dp[i-1][k][1] + prices[i]
 *  cooldown = true
 * }
 */
var maxProfit = function(prices) {
  if (!prices.length) return 0
  let [dp_i0, dp_i1] = [0, -prices[0]]
  for (let i = 0; i < prices.length; i++) {

  }
};