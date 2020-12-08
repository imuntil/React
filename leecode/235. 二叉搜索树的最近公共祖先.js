/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  p = p.val
  q = q.val
  if (p === q) return p
  let min, max
  if (p > q) {
    ;[min, max] = [q, p]
  } else {
    ;[min, max] = [p, q]
  }
  const helper = (node) => {
    const val = node.val
    if (val === min || val === max) return node
    if (val > min && val < max) return node
    if (val > max) {
      return helper(node.left)
    }
    if (val < min) {
      return helper(node.right)
    }
    return null
  }
  return helper(root)
}
