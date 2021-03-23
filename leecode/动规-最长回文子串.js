/**
 *
 * @param {*} str
 * @returns
 */
function longest(str) {
  function check(i, j) {
    while (i >= 0 && j < str.length && str[i] === str[j]) {
      i--
      j++
    }
    return str.slice(i + 1, j)
  }
  let res = 0
  for (let i = 0; i < str.length; i++) {
    const s1 = check(i, i)
    const s2 = check(i, i + 1)
    res = Math.max(res, s1.length, s2.length)
  }
  return res
}

longest('abckdedldkf')
