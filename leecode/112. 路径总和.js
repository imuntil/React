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
var hasPathSum = function(root, sum) {

};

function helper(root, prev) {
  // if (!root) return prev
  prev -= root.val
  if (!root.left && !root.right && prev === 0) {
    return true
  }
  if (root.left) {
    return helper(root.left, prev)
  }
  if (root.right) {
    return helper(root.right, prev)
  }
}