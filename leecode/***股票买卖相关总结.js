/**
 * 首先，基本状态转移方程
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 特殊状态
 * dp[i][0][0] = 0 (0次交易未持有，收益为0)
 * dp[i][0][1] = -infinity (0次交易已持有，不可能)
 * dp[-1][i][0] = 0 (-1表示交易未开始，收益为0)
 * dp[-1][i][1] = -infinity (交易未开始，已持有，不可能)
 * dp[0][k][0] = 0 (第0天，k次交易，未持有，0收益)
 * dp[0][k][1] = -price[0] || -infinity (第0天，k次交易，已经持有)
 *
 * 基本套路
 * for (i:prices) {
 *  for (k = 1; k <= K; k++) {
 *    // 转移方程
 *  }
 * }
 *
 * K <= 1 的简化方程:
 * 带入状态转移方程
 * dp[i][0][0] = 0
 * dp[i][0][1] = -infinity
 * dp[i][1][0] = max(dp[i-1][1][0], dp[i-1][1][1] + prices[i])
 * dp[i][1][1] = max(dp[i-1][1][1], dp[i-1][0][0] - prices[i]) = max(dp[i-1][1][1], -prices[i])
 * 可得
 * dp_i0 = 0, dp_i1 = -infinity
 * dp_i0 = max(dp_i0, dp_i1 + prices[i])
 * dp_i1 = max(dp_i1, -prices[i])
 *
 * K <= prices.length/2:
 * 当prices很大时，会生成NxKx2的dp数组，可能导致内存溢出。
 * 解决这个问题，可以不保存每天每次交易的结果，只保存每次交易的结果，那么只需处理2*K个变量，则有
 * for (j:K)
 *  // 初始化，相当于第0天
 *  dp[j][0] = 0
 *  dp[j][1] = -prices[0]
 * 那么则可以得到状态转移方程
 * dp[j][0] = max(dp[j][0], dp[j][1] + prices[i])
 * dp[j][1] = max(dp[j][1], dp[j-1][0] - prices[i])
 *
 *
 * K === 2:
 * 相当于上面的一个特例，因为只有4个变量，可以罗列出来，以提高性能
 * dp_i10, dp_i11, dp_i20, dp_i21
 * 可得到转移方程
 * dp_i10 = max(dp_i10, dp_i11 + prices[i])
 * dp_i11 = max(dp_i11, dp[i-1][j-1][0] - prices[i]) 【j为1】
 *        = max(dp_i11, -prices[i])
 * dp_i20 = max(dp_i20, dp_i21 + prices[i])
 * dp_i21 = max(dp_i21, dp_i10 - prices[i])
 * 修改下顺序
 * dp_i20 = max(dp_i20, dp_i21 + prices[i])
 * dp_i21 = max(dp_i21, dp_i10 - prices[i])
 * dp_i10 = max(dp_i10, dp_i11 + prices[i])
 * dp_i11 = max(dp_i11, -prices[i])
 *
 *
 *
 * K > prices.length / 2 (k无限):
 * 依然套入方程
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1][k][1] + prices[i])
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k-1][0] - prices[i])
 * 由于k无限，第二个方程可以改写为
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-1][k][0] - prices[i])
 * 那么就方程就和k没有关系了，可以简化为
 * dp_i0 = max(dp_i0, dp_i1 + prices[i])
 * dp_i1 = max(dp_i1, dp_i0 - prices[0])
 * 注意，等号左边都是第i天的收益，等号右边的dp_ix,都是前一天的收益，不能弄混了，做个暂存处理可以得到
 * temp = dp_i0
 * dp_i0 = max(dp_i0, dp_i1 + prices[i])
 * dp_i1 = max(dp_i1, temp - prices[0])
 *
 *
 * 另外还有一些变体
 * 手续费，很简单，卖出的时候额外减去手续费就行
 * dp[i][k][0] = max(dp[i-1][k][0], dp[i-1[k][1] - prices[i] - fee)
 * 
 * 冷却时间：
 * 设每次交易后有x天冷却时间，正常的可以理解为有0天的冷却时间，那么下面的
 * 状态转移方程就很好理解了
 * dp[i][k][1] = max(dp[i-1][k][1], dp[i-x][k-1][0] - prices[i])
 */
