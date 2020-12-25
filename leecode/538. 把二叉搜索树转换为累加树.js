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
var convertBST = function (root) {
  let preSum = 0
  const helper = (node) => {
    if (!node) return
    helper(node.right)
    preSum += node.val
    node.val = preSum
    helper(node.left)
  }
  helper(root)
  return root
}
