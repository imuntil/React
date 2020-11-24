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
var maxDepth = function (root) {
  return tr(root)
}

function tr(root) {
  if (!root) return 0
  const left = 1 + tr(root.left)
  const right = 1 + tr(root.right)
  return Math.max(left, right)
}
