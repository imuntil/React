// https://leetcode-cn.com/problems/best-time-to-buy-and-sell-stock-iv/

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

/**
 * 当prices很大，比如超过10000，会内存溢出
 * 其实结合上面的maxProfit_infinit_k，还有121，123，可以看出，只需要2*k个变量就可以满足保存收益的需求
 */
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

/**
 * 使用2k个变量的简化版本
 * 将i（天）简化调，不必保存每天每次交易的结果，只保存每次交易的结果
 */
maxProfit = function (k, prices) {
  if (!prices.length) return 0
  if (k <= 0) return 0
  if (k > prices.length / 2) return maxProfit_infinit_k(prices)
  const dp = []
  for (let j = 0; j <= k; j++) {
    !dp[j] && (dp[j] = [])
    // 可以理解成第0天
    dp[j][0] = 0
    dp[j][1] = -prices[0]
  }
  for (let i = 0; i < prices.length; i++) {
    for (let j = 1; j <= k; j++) {
      dp[j][0] = Math.max(dp[j][0], dp[j][1] + prices[i])
      dp[j][1] = Math.max(dp[j][1], dp[j - 1][0] - prices[i])
    }
  }
  return dp[k][0]
}
