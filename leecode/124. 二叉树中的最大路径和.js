/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  if (!root) return 0
  let res = Number.MIN_SAFE_INTEGER
  const helper = (node) => {
    if (!node) return 0
    // 递归计算左右节点的最大贡献值
    // 只有贡献值大于0时，才采用对应的节点
    const leftGain = Math.max(helper(node.left), 0)
    const rightGain = Math.max(helper(node.right), 0)

    // 节点的最大路径取决于该节点的值与该节点左右子节点的最大贡献值
    const priceNewPath = node.val + leftGain + rightGain

    res = Math.max(res, priceNewPath)

    // 返回节点的最大贡献值
    return node.val + Math.max(leftGain, rightGain)
  }
  helper(root)
  return res
}

// 更便于理解版本
maxPathSum = function (root) {
  if (!root) return 0
  let res = Number.MIN_SAFE_INTEGER
  const helper = (node) => {
    if (!node) return 0
    // 递归计算左右节点的最大贡献值
    const leftGain = helper(node.left)
    const rightGain = helper(node.right)

    // 节点的最大路径取决于该节点的值与该节点左右子节点的最大贡献值
    const priceNewPath = node.val + leftGain + rightGain

    res = Math.max(res, priceNewPath)

    // 返回节点的最大贡献值
    const gain = node.val + Math.max(leftGain, rightGain)
    // 只有贡献值大于0时，才采用该节点
    return gain > 0 ? gain : 0
  }
  helper(root)
  return res
}
