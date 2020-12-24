/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var getMinimumDifference = function (root) {
  if (!root) return 0
  let pre = undefined
  let abs = Number.MAX_SAFE_INTEGER
  const helper = (node) => {
    if (!node) return null
    helper(node.left)
    if (pre === undefined) {
      pre = node.val
    } else {
      abs = Math.min(abs, node.val - pre)
      pre = node.val
    }
    helper(node.right)
  }
  helper(root)
  return abs
}
