// 数组nums中，是否存在一个集合，使得集合中数字的和等于剩余数字的和; 所有数字均为正整数
function x416(nums) {
  /**
   * 状态：sum(nums)/2,j；可选的数，i
   * dp表含义：dp[i][j] = x, 前i个数字，sum/2为j时，x如果为true(背包装满)，则满足条件
   * 选择（状态转移）：
   *    不选择： dp[i][j] = dp[i-1][j]
   *    选  则： dp[i][j] = dp[i-1][j-nums[i-1]] (容量为j的选择状态，等于容量为j-nums[i]的未选择状态)
   * base case：dp[i][0] = true, dp[0][j] = false（j=0，相当于背包满了）
   */

  let sum = nums.reduce((v1, v2) => v1 + v2)
  if (sum % 2 !== 0) return false
  sum = sum / 2
  const len = nums.length
  const dp = Array(len + 1)
    .fill('')
    .map(() =>
      Array(sum + 1)
        .fill(false)
        .map((_, ix) => ix === 0)
    )

  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= sum; j++) {
      if (j < nums[i - 1]) {
        // 装不下
        dp[i][j] = dp[i - 1][j]
      } else {
        // 不取 || 取
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[len][sum]
}

/**
 * 给定数组nums, 目标和S，操作符+-，求有多少种方法得到S
 * 问题转化：根据+-操作符，将nums分为两部分
 * sumA, sumB
 * sumA - sumB = S
 * sumA = S + sumB
 * 2 * sumA = S + sumB + sumA
 * 2 * sumA = S + sum(nums)
 * sumA = (S + sum(nums)) / 2
 *
 * 状态：选择范围，前i个数字；以及sumA
 * dp表含义：dp[i][j] = x；前i个数字中，和为j的集合个数为x
 * 转移方程：
 *    不选择：dp[i][j] = dp[i-1][j]（和为j时，不选择第i个数字，那可能的集合个数和前i-1个数字是一样的）
 *    选 择:  dp[i][j] = dp[i-1][j-nums[i-1]] (设第i个数字，也就是nums[i-1]值为p，
 *            那么dp[i][j] = dp[i-1][j-x], 也就是前i个数字和为j的集合个数，等于前i-1个数字，和为j-x，也就是j-第i个数字的值)
 * base case：dp[i][0] = 1(全都不选，和即为0); dp[0][j] = 0 (没得选)
 */
function x494(nums, target) {
  let sum = nums.reduce((x, y) => x + y)
  if (sum < target) return 0
  if ((target + sum) % 2 !== 0) return 0
  sum = (target + sum) / 2

  const len = nums.length
  const dp = Array(len + 1)
    .fill('')
    .map(() =>
      Array(sum + 1)
        .fill(0)
        .map((_, ix) => (ix === 0 ? 1 : 0))
    )
  for (let i = 1; i <= len; i++) {
    for (let j = 1; j <= sum; j++) {
      if (nums[i - 1] > j) {
        // 装不下
        dp[i][j] = dp[i - 1][j]
      } else {
        dp[i][j] = dp[i - 1][j] + dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[len][sum]
}
