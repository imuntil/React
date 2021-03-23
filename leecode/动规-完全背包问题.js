/**
 *
 * Leecode 518
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485124&idx=1&sn=52068c8000b90a7a972dbd04658d79b7&chksm=9bd7f8ccaca071da66d3c9e567ab49b27c711db154c2f297f55fcd7c3c1156afa37b0ad60555&scene=21#wechat_redirect
 *
 * @param {number} amount 金额
 * @param {[number]} coins 可选的硬币列表，每个面额的硬币有无数个
 * @returns {number} 得到指定金额的coins组合数
 */
function x(amount, coins) {
  const len = coins.length

  const dp = Array(len + 1)
    .fill('')
    .map(() => Array(amount + 1).fill(0))

  // dp表含义
  // dp[i][j]: 包容量为j时，前i个物品，可以装满包的方法数为dp[i][j]

  // base case:
  // dp[i][0] = 1 容量为0，不适用任何硬币就打到目的
  // dp[0][j] = 0 没有硬币，凑不出任何

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= amount; j++) {
      if (coins[i - 1] > j) {
        // 放不下
        dp[i][j] = dp[i - 1][j]
      } else {
        // dp[i][j] = dp[i-1][j] +
      }
    }
  }
}
