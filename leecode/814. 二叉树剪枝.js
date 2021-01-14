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
 * @return {TreeNode}
 */
var pruneTree = function (root) {
  const helper = (node) => {
    if (!node) return null
    node.left = helper(node.left)
    node.right = helper(node.right)
    if (node.val === 0 && !node.left && !node.right) return null
    return node
  }
  return helper(root)
}
