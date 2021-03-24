/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = Array(nums.length)
    .fill(0)
    .map(() => [0, 0])
  // dp[i][0] 前i家，不打劫第i家
  dp[0][1] = nums[0]
  for (let i = 1; i < nums.length; i++) {
    // 不打劫第i家
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1])
    // 打劫第i家
    dp[i][1] = dp[i - 1][0] + nums[i]
  }
  return Math.max(...dp[nums.length - 1])
}

// rob()

/**
 *
 *
 * @param {[number]} nums
 */
function robs(nums) {
  function dp(ix) {
    if (ix >= nums.length) return 0
    let res = Math.max(
      // 抢
      nums[ix] + dp(ix + 2),
      // 不抢
      dp(ix + 1)
    )
    return res
  }
  return dp(0)
}

/**
 *
 *
 * @param {[number]} nums
 */
function memoRob(nums) {
  const memo = []

  function dp(ix) {
    if (memo[ix] !== undefined) return memo[ix]
    if (ix >= nums.length) return 0

    let res = Math.max(nums[ix] + dp(ix + 2), dp(ix + 1))
    memo[ix] = res
    return res
  }

  return dp(0)
}

// 自底向上
function rob2(nums) {
  const dp = Array(nums.length + 2).fill(0)
  for (let i = nums.length - 1; i >= 0; i--) {
    dp[i] = Math.max(dp[i + 1], nums[i] + dp[i + 2])
  }
  return dp[0]
}

// 状态压缩
function rob3(nums) {
  // 记录 dp[i+1] 和 dp[i+2]
  let dp_i_1 = 0
  // 记录 dp[i]
  let dp_i_2 = 0
  let dp_i
  for (let i = nums.length - 1; i >= 0; i--) {
    dp_i = Math.max(dp_i_1, nums[i] + dp_i_2)
    dp_i_2 = dp_i_1
    dp_i_1 = dp_i
  }
}
