/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  const len = nums.length
  const memo = []

  // dp(nums, p) 从下标p到nums末位，需要dp(nums, p)次跳跃
  function dp(nums, p) {
    if (p >= len - 1) return 0
    if (memo[p] !== undefined) return memo[p]
    const steps = nums[p]
    // 你可以选择跳 1 步，2 步...
    for (let i = 1; i <= steps; i++) {
      // 穷举每一个选择
      // 计算每一个子问题的结果
      const subPro = dp(nums, p + i)
      // 取其中最小的作为最终结果
      memo[p] = Math.min(memo[p], subPro + 1)
      // 3， 4，  1，   1，  1,  end
      // n，n+1, n+2, n+3, n+4, end
      // 从index：n到end，最优解是先跳1不步，到index：n+1，然后再跳4步
    }
    return memo[p]
  }
  return dp(nums, 0)
}

// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485087&idx=1&sn=ddbed992e5ad8f1aa3b3d4afcb17889b&chksm=9bd7f897aca071817d3ea77acf4a8bc8e277bd38a43ebe2ceba2b42c3184886e07775a628fc7&scene=21#wechat_redirect
jump = function (nums) {
  const len = nums.length
  let end = 0
  let farthest = 0
  let res = 0
  // notice: i < len - 1
  for (let i = 0; i < len - 1; i++) {
    farthest = Math.max(farthest, i + nums[i])
    if (i === end) {
      end = farthest
      res++
    }
  }
  return res
}
