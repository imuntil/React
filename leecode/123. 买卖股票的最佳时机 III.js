/**
 * @param {number[]} prices
 * @return {number}
 * 基本状态转移方程
 * dp[i][k][0] = Math.max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = Math.max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 其中(0<=i<=n, 1<=k<=K)
 * 特殊状态：
 * dp[-1][k][0] = 0
 * 解释：因为 i 是从 0 开始的，所以 i = -1 意味着还没有开始，这时候的利润当然是 0 。
 * dp[-1][k][1] = -infinity
 * 解释：还没开始的时候，是不可能持有股票的，用负无穷表示这种不可能。
 * dp[0][k][0] = 0 (第0天，无论几次交易，未持有，收益为0)
 * dp[0][k][1] = -prices[0] (第0天，k次交易，持有，收益为-prices[0])
 * dp[i][0][0] = 0 (i>0, 第i天，0次交易，未持有，收益为0)
 * dp[i][0][1] = -infinity (i>0, 第i天，0次交易，已持有，由于0次交易是不可能持有，所以不存在收益，设为-infinity)
 */

var maxProfit = function (prices) {
  if (!prices.length) return 0
  const max_k = 2
  const dp = []
  for (let i = 0; i < prices.length; i++) {
    !dp[i] && (dp[i] = [])
    for (let k = 0; k <= max_k; k++) {
      !dp[i][k] && (dp[i][k] = [])
      if (i === 0) {
        dp[i][k][0] = 0
        dp[i][k][1] = -prices[i]
        continue
      }
      if (k === 0) {
        dp[i][k][0] = 0
        dp[i][k][1] = Number.MIN_SAFE_INTEGER
        continue
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }
  return dp[prices.length - 1][max_k][0]
}

/**
 * 简化写法
 * dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
 * dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i]) = max(dp[i-1][1][1], -prices[i])
 * dp[i][2][0] = max(dp[i-1][2][0], dp[i-1][2][1] + prices[i])
 * dp[i][2][1] = max(dp[i-1][2][1], dp[i-1][1][0] - prices[i])
 */
maxProfit = function (prices) {
  if (!prices.length) return 0
  // 根据上面的状态转移方程，计算的结果应该是[0, -prices[0], 0, -prices[0]]
  // 实际结果是，下面两个初始状态都ok，结果都是正确的。
  let [dp_i10, dp_i11, dp_i20, dp_i21] = [
    0,
    Number.MIN_SAFE_INTEGER,
    0,
    Number.MIN_SAFE_INTEGER,
  ]
  // let [dp_i10, dp_i11, dp_i20, dp_i21] = [0, -prices[0], 0, -prices[0]]
  for (let i = 0; i < prices.length; i++) {
    const p = prices[i]
    // dp_i10 = Math.max(dp_i10, dp_i11 + p)
    // dp_i11 = Math.max(dp_i11, -p)
    // dp_i20 = Math.max(dp_i20, dp_i21 + p)
    // // 可见，dp_i21需要dp_i10的结果，儿dp_i10在上面发生了变化，所以要么用个变量暂存dp_i10,要么改变顺序
    // dp_i21 = Math.max(dp_i21, dp_i10 - p)

    // 修改顺序
    dp_i20 = Math.max(dp_i20, dp_i21 + p)
    dp_i21 = Math.max(dp_i21, dp_i10 - p)
    dp_i10 = Math.max(dp_i10, dp_i11 + p)
    dp_i11 = Math.max(dp_i11, -p)
  }
  return dp_i20
}
