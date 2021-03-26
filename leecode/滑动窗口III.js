// 无重复字符的最长子串
// https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484504&idx=1&sn=5ecbab87e42033cc0a62b635cc436977&chksm=9bd7fa50aca07346a3ffa6be6fccc445968c162af9532fa9c6304eaab2e3a1b79a4bbe758c0a&scene=178&cur_album_id=1318896187793260544#rd
function x(s) {
  let [p1, p2] = [0, 0]
  const hash = {}
  let res = 0
  while (p2 < s.length) {
    const c2 = s[p2]
    if (!hash[c2]) {
      hash[c2] = true
      res = Math.max(res, p2 - p1)
    } else {
      while (p1 < p2) {
        const c1 = s[p1]
        p1++
        if (c1 === c2) {
          break
        }
        hash[c1] = false
      }
    }
    p2++
  }
  return res + 1
}

x('abcabcbb')
