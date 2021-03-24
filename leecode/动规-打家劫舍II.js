/**
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484800&idx=1&sn=1016975b9e8df0b8f6df996a5fded0af&chksm=9bd7fb88aca0729eb2d450cca8111abd8f861236b04125ce556171cb520e298ddec4d90823b3&scene=21#wechat_redirect
 * @param {[number]} nums
 * @returns {number}
 */
function rob(nums) {
  if (nums.length === 1) return nums[0]
  function dp(start, end) {
    let [dp_i, dp_i_1, dp_i_2] = [0, 0, 0]
    for (let i = end; i >= start; i--) {
      dp_i = Math.max(dp_i_1, nums[i] + dp_i_2)
      dp_i_2 = dp_i_1
      dp_i_1 = dp_1
    }
    return dp_i
  }
  const len = nums.length
  return Math.max(dp(0, len - 2), dp(1, len - 1))
}


function rob2(nums) {
  if (nums.length === 1) return nums[0]
  function dp(subNums) {
    const len = subNums.length
    const dp = Array(len + 2).fill(0)
    for (let i = len - 1; i >= 0; i--) {
      dp[i] = Math.max(dp[i + 1], subNums[i] + dp[i + 2])
    }
    return dp[0]
  }
  return Math.max(dp(nums.slice(0, -1)), dp(nums.slice(1)))
}
