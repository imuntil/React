/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {boolean}
 */
var hasPathSum = function (root, sum) {
  const helper = (node, val) => {
    if (!node) return
    val += node.val
    if (!node.left && !node.right && val === sum) {
      return true
    }
    const left = helper(node.left, val)
    if (left === true) return true
    const right = helper(node.right, val)
    if (right === true) return true
  }
  return helper(root, 0) === true
}
