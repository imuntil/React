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
 * @return {boolean}
 */
var isBalanced = function (root) {
  const helper = (node) => {
    if (!node) return 0
    const left = 1 + helper(node.left)
    const right = 1 + helper(node.right)
    return Math.max(left, right) - Math.min(left, right)
  }
  return Math.abs(helper(root)) <= 1
}

// [1,2,3,4,5,6,null,8]
// [1,2,2,3,3,null,null,4,4]
// [3,9,20,null,null,15,7]
// [1,null,2,null,3]
