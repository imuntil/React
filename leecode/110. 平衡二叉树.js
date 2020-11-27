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
  return helper(root) !== -1
}

function helper(root) {
  if (!root) return 0
  const left = helper(root.left)
  if (left === -1) return -1
  const right = helper(root.right)
  if (right === -1) return -1
  return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1
}

// [1,2,3,4,5,6,null,8]
// [1,2,2,3,3,null,null,4,4]
// [3,9,20,null,null,15,7]
// [1,null,2,null,3]
// []
// [1]
// [1,2]
// [1,2,3]
// [1,2,null,3,null,4,null,null,5]
// [1,2,2,3,null,null,3,4,null,null,4]
