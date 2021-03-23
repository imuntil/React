/**
 *
 * @param {string} str
 */
function longest(str) {
  const len = str.length
  const dp = Array(len)
    .fill('')
    .map(() => Array(len).fill(0))

  // base case
  for (let i = 0; i < len; i++) {
    dp[i][i] = 1
  }

  for (let i = len - 1; i >= 0; i--) {
    for (let j = i + 1; j < len; j++) {
      if (str[i] === str[j]) {
        dp[i][j] = dp[i + 1][j - 1] + 2
      } else {
        dp[i][j] = Math.max(dp[i][j - 1], dp[i + 1][j])
      }
    }
  }

  return dp[0][len - 1]
}

longest('bbaab')