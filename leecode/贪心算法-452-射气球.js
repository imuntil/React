/**
 *
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484493&idx=1&sn=1615b8a875b770f25875dab54b7f0f6f&chksm=9bd7fa45aca07353a347b7267aaab78b81502cf7eb60d0510ca9109d3b9c0a1d9dda10d99f50&scene=21#wechat_redirect
 *
 * 有几个不重复的区间，就需要几只箭
 * @param {[[number, number], ...]} intervals
 * @returns number
 */
function v(intervals) {
  if (!intervals.length) return 0
  intervals.sort((a, b) => a[1] - b[1])
  let res = 1
  let end = intervals[0][1]
  for (let i = 1; i < intervals.length; i++) {
    const cur = intervals[i]
    if (cur[0] > end) {
      res++
      end = cur[1]
    }
  }
  return res
}
