// 最小覆盖子串
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484504&idx=1&sn=5ecbab87e42033cc0a62b635cc436977&chksm=9bd7fa50aca07346a3ffa6be6fccc445968c162af9532fa9c6304eaab2e3a1b79a4bbe758c0a&scene=178&cur_album_id=1318896187793260544#rd
function x(s, t) {
  if (t.length > s.length) return ''

  let [start, length] = [0, Number.MAX_SAFE_INTEGER]
  const tobj = {}
  const sobj = {}

  // 快慢指针
  let [p1, p2] = [0, 0]

  for (let i = 0; i < t.length; i++) {
    const key = t[i]
    tobj[key] = (tobj[key] || 0) + 1
  }
  // 已经匹配的字符
  let match = 0
  // 需要匹配的字符数
  const needMatch = Object.keys(tobj).length
  while (p2 < s.length) {
    const cur = s[p2]
    if (tobj[cur]) {
      sobj[cur] = (sobj[cur] || 0) + 1
      // 某一个字符匹配
      if (sobj[cur] === tobj[cur]) {
        // 匹配数+1
        match++
      }
    }
    p2++
    // 满足匹配（s的某个子串，包含t的全部字符）
    while (match === needMatch) {
      if (p2 - p1 < length) {
        // 更新起始指针和长度
        start = p1
        length = p2 - p1
      }

      const curr = s[p1]
      // t字符串包含该字符
      if (tobj[curr]) {
        sobj[curr]--
        // 不匹配了
        if (sobj[curr] < tobj[curr]) {
          // match-1
          match--
        }
      }
      p1++
    }
  }

  console.log(`length`, length)

  return length === Number.MAX_SAFE_INTEGER ? '' : s.substr(start, length)
}


x('adobecodebanc', 'abc')