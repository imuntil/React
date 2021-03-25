/**
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484509&idx=1&sn=21ace57f19d996d46e82bd7d806a2e3c&source=41#wechat_redirect
 *
 * 允许一次交易，求最大收益
 * @param {[number]} prices
 * @returns {number}
 */
function x(prices) {
  const len = prices.length
  let res = 0
  // 第i天买入，第j天卖出
  for (let i = 0; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      res = Math.max(res, prices[j] - prices[i])
    }
  }
  return res
}

function xx(prices) {
  const len = prices.length
  let curMin = prices[0]
  let res = 0
  for (let i = 1; i < len; i++) {
    // curMin: 区间[0-i]中的最小值
    curMin = Math.min(curMin, prices[i])
    // 在区间最小值是买入，第i天卖出，i >= 区间最小值对应的日期
    res = Math.max(res, prices[i] - curMin)
  }
  return res
}

// 状态机解法
// 基本思路
function xxx(prices, K = 1) {
  // dp[i][k][0] 第i天，最多进行k次交易，未持有股票
  // dp[i][k][1] 第i天，最多进行k次交易，持有股票

  // 买入才算开始一次交易，数组默认0开始，所以设定0表示没有交易过，1表示第一次交易

  // 状态转移
  // notice： 一次交易包含一次买入和一次卖出
  // dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
  // 今天未持有股票 = max(【昨天未持有股票，今天保持】，【昨天持有股票，今天卖出】)
  // 今天卖出，是一次交易未完成交易的结束，交易次数依然为k
  // dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
  // 今天持有股票 = max(【昨天持有股票，今天保持】，【昨天未持有股票，今天买入】)
  // 今天买入，相当于开启了新的一次交易，买么之前的交易就是k-1了

  const n = prices.length
  const dp = Array(n)
    .fill('')
    .map(() =>
      Array(K + 1)
        .fill('')
        .map(() => [0, 0])
    )
  // base case
  // 交易没开始，收益0：dp[i][0][0] = 0;
  //                  dp[-1][k][0] = 0
  // 交易没开始，却持有股票：dp[i][0][1] = -infinity;
  //                      dp[-1][k][1] = -infinity

  for (let i = 0; i < n; i++) {
    dp[i][0][1] = Number.MIN_SAFE_INTEGER
  }

  for (let i = 0; i < n; i++) {
    for (let k = 1; k <= K; k++) {
      // 处理边界
      if (i === 0) {
        // dp[0][k][0] = Math.max(dp[-1][k][0], dp[-1][k][1] + prices[i]) = Math.max(0, -infinity + prices[0])
        dp[i][k][0] = 0
        // dp[0][k][1] = Math.max(dp[-1][k][1], dp[-1][k-1][0] - prices[0]) = Math.max(-Infinity, 0 - prices[0])
        dp[i][k][1] = -prices[i]
        continue
      }

      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }

  return dp[n - 1][K][0]
}

// xxx([7, 1, 5, 3, 6, 4])

// 状态机压缩
// 交易1次
function xxx1x(prices) {
  // base case
  // dp[-1][0] = 0, dp[-1][1] = -infinity
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    // dp[i][1] = max(dp[i-1][1], dp[i-1][0] - prices)
    //          = max(dp[i-1][1][1], dp[i-1][0][0] - prices)
    // dp[i-1][0][0] 没开始交易，未持有，= 0
    dp_i_1 = Math.max(dp_i_1, -prices[i])
  }
  return dp_i_0
}

// 最多交易两次
function xxx2(prices) {}
function xxx2x(prices) {
  // for (let i = 0; i < prices.length; i++) {
  //   dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
  //   dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
  // }
  // 根据状态转换方程可得
  // dp_i_1_0 = max(dp_i_1_0, dp_i_1_1 + prices[i])
  // dp_i_1_1 = max(dp_i_1_1, dp_i_0_0 - prices[i])
  // dp_i_2_0 = max(dp_i_2_0, dp_i_2_1 + prices[i])
  // dp_i_2_1 = max(dp_i_2_1, dp_i_1_0 - prices[i])
  // base case
  // dp[-1][k][0] = 0, dp[-1][k][1] = -infinity
  let [dp_i_1_0, dp_i_1_1, dp_i_2_0, dp_i_2_1] = [
    0,
    Number.MIN_SAFE_INTEGER,
    0,
    Number.MIN_SAFE_INTEGER,
  ]
  for (let i = 0; i < prices.length; i++) {
    const temp = dp_i_1_0
    dp_i_1_0 = Math.max(dp_i_1_0, dp_i_1_1 + prices[i])
    dp_i_1_1 = Math.max(dp_i_1_1, 0 - prices[i])

    dp_i_2_0 = Math.max(dp_i_2_0, dp_i_2_1 + prices[i])
    dp_i_2_1 = Math.max(dp_i_2_1, temp - prices[i])
  }

  return dp_i_2_0
}

// 交易任意次
function xxxInf(prices) {
  // for (let i = 0; i < prices.length; i++) {
  //   dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
  //   dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
  // }
  // 由上面的状态转移可知，状态变化仅仅和i，k相关，由于k是无穷的，所以k可以忽略
  // 可得
  // base case
  // dp[-1][k][0] = 0; dp[-1][k][1] = -infinity
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    const temp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    dp_i_1 = Math.max(dp_i_1, temp - prices[i])
  }
  return dp_i_0
}

// 手续费, 任意次，收益最高
function xxxFee(prices, fee) {
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  for (let i = 0; i < prices.length; i++) {
    let temp = dp_i_0
    // 相当于股票的收益减少了
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i] - fee)
    dp_i_1 = Math.max(dp_i_1, temp - prices[i])
  }
  return dp_i_0
}

// 1天冷却时间，任意次，收益最高
function xxxCD(prices) {
  let [dp_i_0, dp_i_1] = [0, Number.MIN_SAFE_INTEGER]
  // dp[i-2][0]
  let dp_i_pre_0 = 0
  for (let i = 0; i < prices.length; i++) {
    let temp = dp_i_0
    dp_i_0 = Math.max(dp_i_0, dp_i_1 + prices[i])
    // 第i-1天持有，今天保持；第i-2天未持有，今天买入（1天的cd，卖出后至少需要隔一天才能买入）
    dp_i_1 = Math.max(dp_i_1, dp_i_pre_0 - prices[i])
    dp_i_pre_0 = temp
  }
  return dp_i_0
}

function xxxCD2(prices) {
  // k无穷
  const n = prices.length
  const dp = Array(n)
    .fill('')
    .map(() => [0, 0])
  // base case
  // dp[-1][0] = 0
  // dp[-1][1] = -infinity

  // 状态转移
  // dp[i][0] = max(dp[i-1][0], dp[i-1][1] + prices[i])
  // 第i-1天持有，今天保持；第i-2天未持有，今天买入（1天的cd，卖出后至少需要隔一天才能买入）
  // dp[i][1] = max(dp[i-1][1], dp[i-2][0] - prices[i])
  for (let i = 0; i < n; i++) {
    if (i === 0) {
      dp[i][0] = 0
      dp[i][1] = -prices[i]
      continue
    }
    if (i === 1) {
      dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
      dp[i][1] = Math.max(dp[i - 1][1], -prices[i])
      continue
    }
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][1] + prices[i])
    dp[i][1] = Math.max(dp[i - 1][1], dp[i - 2][0] - prices[i])
  }

  return dp[n - 1][0]
}

/**
 * 给定最大交易次数，收益最高
 * 一次交易（买入，卖出）至少需要两天，所以交易次数最多不会超过prices.length/2
 * 当k >= prices.length/2 时，可认为是交易任意次: xxxInf
 *
 * @param {[number]} prices
 * @param {numebr} K
 */
function xxxTimes(prices, K) {
  const len = prices.length
  if (K >= len >> 1) {
    return xxxInf(prices)
  }

  const dp = Array(len)
    .fill('')
    .map(() =>
      Array(K + 1)
        .fill('')
        .map(() => [0, 0])
    )

  // base case
  // dp[-1][k][0] = 0; dp[-1][k][1] = -infinity
  // dp[i][0][0] = 0; dp[i][0][1] = -infinity

  for (let i = 0; i < len; i++) {
    dp[i][0][0] = 0
    dp[i][0][1] = Number.MIN_SAFE_INTEGER
  }

  for (let i = 0; i < len; i++) {
    for (let k = 1; k <= K; k++) {
      if (i === 0) {
        // base case
        dp[i][k][0] = 0
        dp[i][k][1] = -prices[i]
        continue
      }
      dp[i][k][0] = Math.max(dp[i - 1][k][0], dp[i - 1][k][1] + prices[i])
      dp[i][k][1] = Math.max(dp[i - 1][k][1], dp[i - 1][k - 1][0] - prices[i])
    }
  }

  return dp[len - 1][K][0]
}
