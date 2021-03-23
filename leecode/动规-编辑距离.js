
/**
 * str2 => str1 的最小编辑步数
 * 'abc' => 'bcc' 最小编辑步数
 * @param {string} str1
 * @param {string} str2
 * 
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484731&idx=3&sn=aa642cbf670feee73e20428775dff0b5&chksm=9bd7fb33aca0722568ab71ead8d23e3a9422515800f0587ff7c6ef93ad45b91b9e9920d8728e&scene=21#wechat_redirect
 */
function minDistance(str1, str2) {
  const [M, N] = [str1.length, str2.length]
  const dp = Array(M + 1)
    .fill('')
    .map((_, ix) => Array(N + 1).fill(0))
  // base case
  for (let i = 0; i <= M; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j <= N; j++) {
    dp[0][j] = j
  }

  for (let i = 1; i <= M; i++) {
    for (let j = 1; j <= N; j++) {
      // notice [x - 1] 开始
      if (str1[i - 1] === str2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]
      } else {
        dp[i][j] = Math.min(
          // 删除str2[j], str1[i] 与 str1[j-1]比较，操作数+1
          dp[i][j - 1] + 1,
          // 插入str2[j] 插入和str1[i]同样的字符，下一轮比较str1[i-j],str2[j]，操作数+1
          dp[i - 1][j] + 1,
          // 替换：将str2[j] 的值替换为str1[i]的值，下一轮都向前移动
          dp[i - 1][j - 1] + 1
        )
      }
    }
  }

  return dp[M][N]
}
