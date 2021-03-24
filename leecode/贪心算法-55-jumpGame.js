/**
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247485087&idx=1&sn=ddbed992e5ad8f1aa3b3d4afcb17889b&chksm=9bd7f897aca071817d3ea77acf4a8bc8e277bd38a43ebe2ceba2b42c3184886e07775a628fc7&scene=21#wechat_redirect
 *
 * @param {[number]} arrs
 * @returns {boolean}
 */
function jump(arrs) {
  let max = 0
  // notice: arrs.length - 1; 跳到结尾就行，不需要计算最后一个节点的可以跳到哪里
  for (let i = 0; i < arrs.length - 1; i++) {
    max = Math.max(max, arrs[i] + i)
    if (max <= i) {
      return false
    }
  }
  return max >= arrs.length - 1
}
