// 找到字符串中所有字母异位词
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484504&idx=1&sn=5ecbab87e42033cc0a62b635cc436977&chksm=9bd7fa50aca07346a3ffa6be6fccc445968c162af9532fa9c6304eaab2e3a1b79a4bbe758c0a&scene=178&cur_album_id=1318896187793260544#rd
function x(s, t) {
  if (t.length > s.length) return []
  const sobj = {}
  const tobj = {}
  for (let i = 0; i < t.length; i++) {
    const k = t[i]
    tobj[k] = (tobj[k] || 0) + 1
  }
  const needMatch = Object.keys(tobj).length
  let matched = 0
  
  let [p1, p2] = [0, 0]
  const res = []
  while (p2 < s.length) {
    const c2 = s[p2]
    if (tobj[c2]) {
      sobj[c2] = (sobj[c2] || 0) + 1
      if (sobj[c2] === tobj[c2]) {
        matched++
      }
    }
    p2++
    while (matched === needMatch) {
      const c1 = s[p1]
      if (p2 - p1 === t.length) {
        res.push(p1)
      }
      if (tobj[c1]) {
        sobj[c1]--
        if (sobj[c1] < tobj[c1]) {
          matched--
        }
      }
      p1++
    }
  }
  return res
}

x('cbaebabacd', 'abc')
// console.log(x('abab', 'ab'))
