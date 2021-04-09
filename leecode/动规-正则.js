// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484513&idx=1&sn=e5fc3cce76c1b916195e1793122c28b8&chksm=9bd7fa69aca0737fe704ea5c6da28f47b9e3f0961df2eb40ef93a7d507ace8def1a18d013515&scene=21#wechat_redirect

// 暴力递归
function isMatch(text, pattern) {
  if (!pattern) return !text
  // 匹配第一个字符
  const first = text && (text[0] === pattern[0] || pattern[0] === '.')
  // 如果pattern中存在*，且在第二位
  if (pattern.length >= 2 && pattern[1] === '*') {
    return (
      // *匹配0或多个，匹配0个的情况
      isMatch(text, pattern.slice(2)) ||
      // 匹配1个的情况，递归匹配后一个
      (first && isMatch(text.slice(1), pattern))
    )
  } else {
    // 递归匹配下一个字符
    return first && isMatch(text.slice(1), pattern.slice(1))
  }
}

// memo备忘录
function isMatch(text, pattern) {
  const memo = {}
  function dp(i, j) {
    const key = i + ',' + j
    if (dp[key]) return dp[key]
    if (j === pattern.length) return i === text.length
    const first = i < text.length && (text[i] === pattern[j] || text[i] === '.')
    let res
    if (pattern.length - j >= 2 && pattern[j + 1] === '*') {
      res = dp(i, j + 2) || (first && dp(i + 1, j))
    } else {
      res = first && dp(i + 1, j + 1)
    }
    memo[key] = res
    return res
  }
  return dp(0, 0)
}
