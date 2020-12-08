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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  let i = 0;
  let res = null
  const helper = node => {
    if (!node || res) return
    helper(node.left)
    i++
    if (i === k) {
      res = node.val
      return
    }
    helper(node.right)
  }
  helper(root)
  return res
}
