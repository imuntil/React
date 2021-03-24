/**
 * Leecode 337
 * https://leetcode-cn.com/problems/house-robber-iii/
 * https://mp.weixin.qq.com/s?__biz=MzAxODQxMDM0Mw==&mid=2247484800&idx=1&sn=1016975b9e8df0b8f6df996a5fded0af&chksm=9bd7fb88aca0729eb2d450cca8111abd8f861236b04125ce556171cb520e298ddec4d90823b3&scene=21#wechat_redirect
 * @param {TreeNode} root 
 * @returns {number}
 */
function rob(root) {
  function dp(node) {
    // [不抢，抢]
    if (!node) return [0, 0]
    const left = dp(node.left)
    const right = dp(node.right)

    // 抢，下家就不能抢了
    const doIt = node.val + left[0] + right[0]
    // 不抢，下家可抢可不抢，取决于收益大小
    const notDo = Math.max(left[0], left[1]) + Math.max(right[0], right[1])
    return [notDo, doIt]
  }

  return Math.max(...dp(root))
}
