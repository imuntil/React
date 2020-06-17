function minWindow(s, t) {
  let res = { length: s.length + 1 }
  let left = 0
  let right = 0
  const needs = {}
  const have = {}
  let char = ''
  let match = 0

  t.split('').forEach((v) => {
    needs[v] = (needs[v] || 0) + 1
    have[v] = 0
  })

  const needsSize = Object.keys(needs).length

  while (right < s.length) {
    char = s[right]
    right++
    if (needs[char]) {
      have[char]++
      if (have[char] === needs[char]) {
        match++
      }
    }
    if (match === needsSize) {
      let temp = s.slice(left, right)
      res = temp.length < res.length ? temp : res
      while (left < right) {
        char = s[left]
        left++
        if (needs[char]) {
          have[char] -= 1
          if (have[char] < needs[char]) {
            match--
            break
          }
        }
      }
    }
  }

  return res.length <= s.length ? res : ''
}
