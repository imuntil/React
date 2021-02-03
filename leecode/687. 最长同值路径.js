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
 * @return {number}
 */
var longestUnivaluePath = function (root) {
  let res = 0
  const helper = (node) => {
    if (!node) return 0
    const { left, right, val } = node
    const leftLen = helper(left)
    const rightLen = helper(right)
    let [ll, rl] = [0, 0]
    if (left && left.val === val) {
      ll = leftLen + 1
    }
    if (right && right.val === val) {
      rl = rightLen + 1
    }
    res = Math.max(res, ll + rl)
    return Math.max(ll, rl)
  }
  helper(root)
  return res
}
