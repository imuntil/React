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
var findTilt = function (root) {
  let res = 0
  const helper = (node) => {
    if (!node) return 0
    const lsum = helper(node.left)
    const rsum = helper(node.right)
    res += Math.abs(lsum - rsum)
    return lsum + rsum + node.val
  }
  helper(root)
  return res
}
