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
var sumOfLeftLeaves = function (root) {
  let res = 0
  const helper = (node) => {
    if (!node) return
    const { left, right } = node
    if (left && !left.left && !left.right) {
      res += left.val
    }
    helper(left)
    helper(right)
  }
  helper(root)
  return res
}
