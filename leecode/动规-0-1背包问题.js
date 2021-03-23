/**
 *
 * @param {number} W 背包容量
 * @param {[number]} nums 物品重量列表
 * @param {[number]} vals 物品价值列表
 * @returns {number}
 *
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485064&idx=1&sn=550705eb67f5e71487c8b218382919d6&chksm=9bd7f880aca071962a5a17d0f85d979d6f0c5a5ce32c84b8fee88e36d451f9ccb3bb47b88f78&scene=21#wechat_redirect
 */

function x(W, nums, vals) {
  const N = nums.length

  const dp = Array(N + 1)
    .fill('')
    .map(() => Array(W + 1).fill(0))

  // dp[i][j] 背包容量为j时，前i个物品装入背包的最大价值为dp[i][j]
  // base case: dp[i][0] = 0, 背包容量为0，价值为0
  // dp[0][j] = 0, 可选物品为0，背包可装价值也为0

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= W; j++) {
      if (nums[i - 1] > j) {
        // 物品重量大于背包容量j，不能放入背包
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = Math.max(
          // 不放入背包
          dp[i - 1][j],
          // 放入背包
          dp[i - 1][j - nums[i - 1]] + vals[i - 1]
        )
      }
    }
  }
  return dp[N][W]
}

x(4, [2, 1, 3], [4, 2, 3])
