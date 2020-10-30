/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  const need = {}
  const window = {}
  let targetSize = 0
  let res = ''
  for (let c of t) {
    if (need[c]) {
      need[c]++
    } else {
      need[c] = 1
      targetSize++
    }
  }
  let [left, right] = [0, 0]
  let valid = 0
  while (right < s.length) {
    const x = s[right]
    right++
    if (need[x]) {
      window[x] = (window[x] || 0) + 1
      window[x] === need[x] && valid++
    }
    while (valid === targetSize) {
      const y = s[left]
      if (need[y]) {
        window[y]--
        if (window[y] < need[y]) {
          valid--
          const temp = s.slice(left, right)
          if (!res) {
            res = temp
          } else {
            temp.length < res.length && (res = temp)
          }
        }
      }
      left++
    }
  }
  return res
}

console.log(minWindow('a', 'a'))
