/**
 * https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 *
 * k 无限
 */
var maxProfit = function (prices, fee) {
  if (!prices.length) return
  let [dp_i0, dp_i1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    let temp = dp_i0
    dp_i0 = Math.max(dp_i0, dp_i1 + prices[i] - fee)
    dp_i1 = Math.max(dp_i1, temp - prices[i])
  }
  return dp_i0
}
