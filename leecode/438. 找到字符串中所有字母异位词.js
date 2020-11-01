// 滑动窗口

/**
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
  if (p.length > s.length) return []
  if (!s) return []
  let [left, right, valid, needSize] = [0, 0, 0, 0]
  const [need, window] = [{}, {}]
  const res = []
  for (let i of p) {
    if (need[i]) {
      need[i]++
    } else {
      need[i] = 1
      needSize++
    }
  }
  while (right < s.length) {
    const c1 = s[right]
    if (need[c1]) {
      window[c1] = (window[c1] || 0) + 1
      window[c1] === need[c1] && valid++
    }
    right++
    while (needSize === valid) {
      if (right - left === p.length) {
        res.push(left)
      }
      const c2 = s[left]
      if (need[c2]) {
        window[c2]--
        window[c2] < need[c2] && valid--
      }
      left++
    }
  }
  return res
}
