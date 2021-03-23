/**
 *
 * Leecode 416
 *
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485103&idx=1&sn=8a9752e18ed528e5c18d973dcd134260&chksm=9bd7f8a7aca071b14c736a30ef7b23b80914c676414b01f8269808ef28da48eb13e90a432fff&scene=21#wechat_redirect
 * @param {[number]} nums 物品重量列表
 * @returns {boolean}
 *
 */
function x(nums) {
  let sum = nums.reduce((x, y) => x + y)
  // 结合A = 集合B
  // sumA + sumB = sum; sumA = sumB
  // => sumA = sum / 2

  // 不能均分成两部分，自然不能满足条件
  if (sum % 2 === 1) return false
  sum /= 2

  // 问题转换为了，N个物品，选取任意数量，是否可以恰好装满背包W（sum/2)
  // dp[i][j]=true 容量为j，前i个物品,恰好可以装满
  // dp[i][j]=false 容量为j，前i个物品,不可以装满

  const N = nums.length
  const dp = Array(N + 1)
    .fill('')
    .map(() => Array(sum + 1).fill(false))

  // base case:
  //  dp[i][0] = true (容量为0，不装就是满的)
  //  dp[0][j] = false (容量为j，没有物品可以装，自然不满)

  for (let i = 0; i <= N; i++) {
    dp[i][0] = true
  }

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= sum; j++) {
      if (nums[i - 1] > j) {
        // 装不下
        dp[i][j] = dp[i - 1][j]
      } else {
        // 装入 || 不装入 （两种操作，有任何一个能恰好装满，就ok）
        dp[i][j] = dp[i - 1][j] || dp[i - 1][j - nums[i - 1]]
      }
    }
  }

  return dp[N][sum]
}

x([1, 5, 11, 5])
// x([1, 2, 3, 5])
