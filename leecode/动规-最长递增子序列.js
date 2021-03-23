/**
 * 最长递增子序列
 * @param {[number]} nums
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484498&idx=1&sn=df58ef249c457dd50ea632f7c2e6e761&source=41#wechat_redirect
 */
function longest(nums) {
  const dp = Array(nums.length).fill(1)

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

/**
 * 信封嵌套
 * @param {[[number,number],[number, number], ...]} arrs
 */
function x(arrs) {
  // 先排序，按照宽升序排列，宽相同的，按照高降序排列
  arrs.sort((a, b) => (a[0] === b[0] ? b[1] - a[1] : a[0] - b[0]))
  // 最长递增子序列
  const hs = arrs.map((v) => v[1])
  return longest(hs)
}
