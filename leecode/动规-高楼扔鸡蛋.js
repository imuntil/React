// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484675&idx=1&sn=4a4ac1c0f1279530b42fedacc6cca6e6&chksm=9bd7fb0baca0721dda1eaa1d00b9a520672dc9d5c3be762eeca869be35d7ce232922ba8e928b&scene=21#wechat_redirect

/**
 *
 * @param {number} K 鸡蛋数量
 * @param {number} N 楼高（N层）
 */
function eggDrop(K, N) {
  const memo = {}

  function dp(k, n) {
    // 没有鸡蛋，最多可尝试次数为0
    if (k === 0) return 0
    // 只有一个鸡蛋，最多可尝试次数为n（只能一层一层的试）
    if (k === 1) return n

    const key = k + ',' + n
    // 备忘录
    if (memo[key] !== undefined) return memo[key]
    let res = Number.MIN_SAFE_INTEGER
    for (let i = 1; i <= N; i++) {
      res = Math.min(
        res,
        Math.max(
          // 鸡蛋碎了，鸡蛋数量-1，楼层-1（当前第i层，鸡蛋碎了，搜索区间变为[1, i-1]）
          dp(k - 1, i - 1),
          // 鸡蛋没碎，k不变，当前第i层，鸡蛋没有碎，操作区间变为（n-i,n]
          dp(k, n - i)
          // 扔了一次，操作数+1
        ) + 1
      )
    }
    memo[key] = res
    return res
  }

  return dp(K, N)
}

eggDrop()
