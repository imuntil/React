/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */

// 典型滑动窗口方案
var checkInclusion = function (s1, s2) {
  if (s1.length > s2.length) return false
  if (!s2) return false
  if (!s1) return true
  const need = {}
  const window = {}
  let [valid, needSize, left, right] = [0, 0, 0, 0]
  for (let i of s1) {
    if (need[i]) {
      need[i]++
    } else {
      need[i] = 1
      needSize++
    }
  }
  while (right < s2.length) {
    const c1 = s2[right]
    if (need[c1]) {
      window[c1] = (window[c1] || 0) + 1
      window[c1] === need[c1] && valid++
    }
    right++
    while (needSize === valid) {
      if (right - left === s1.length) return true
      const c2 = s2[left]
      if (need[c2]) {
        window[c2]--
        window[c2] < need[c2] && valid--
      }
      left++
    }
  }
  return false
}

// 变体，待优化
var checkInclusion2 = function (s1, s2) {
  if (s1.length > s2.length) return false
  if (!s2) return false
  if (!s1) return true
  const need = {}
  const window = {}
  let [valid, needSize, left, right] = [0, 0, 0, 0]
  for (let i of s1) {
    if (need[i]) {
      need[i]++
    } else {
      need[i] = 1
      needSize++
    }
  }
  while (right < s2.length) {
    const c1 = s2[right]
    right++
    if (need[c1]) {
      window[c1] = (window[c1] || 0) + 1
      window[c1] === need[c1] && valid++
    }
    if (right - left === s1.length) {
      if (valid === needSize) {
        return true
      }
      const c2 = s2[left]
      left++
      if (need[c2]) {
        // __todo  why???
        window[c2] === need[c2] && valid--
        window[c2]--
      }
    }
  }
  return false
}
