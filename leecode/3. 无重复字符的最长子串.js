// 滑动窗口

// 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  let res = 0
  let [left, right] = [0, 0]
  const pool = new Set()
  while (right < s.length) {
    const c1 = s[right]
    while (pool.has(c1)) {
      const c2 = s[left]
      pool.delete(c2)
      left++
    }
    pool.add(c1)
    res = Math.max(res, pool.size)
    right++
  }
  return res
}
