/**
 *
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484493&idx=1&sn=1615b8a875b770f25875dab54b7f0f6f&chksm=9bd7fa45aca07353a347b7267aaab78b81502cf7eb60d0510ca9109d3b9c0a1d9dda10d99f50&scene=21#wechat_redirect
 * @param {[[number, number], ...]} arrs
 */
function x(arrs) {
  arrs.sort((a, b) => a[1] - b[1])

  let end = arrs[0][1]
  let res = 1
  for (let i = 1; i < arrs.length; i++) {
    const cur = arrs[i]
    if (cur[0] >= end) {
      res++
      end = cur[1]
    }
  }

  return res
}

function xx(arrs) {
  return arrs.length - x(arrs)
}
