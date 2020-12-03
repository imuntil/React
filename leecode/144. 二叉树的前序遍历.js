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
 * @return {number[]}
 */
var preorderTraversal = function (root) {
  if (!root) return []
  const q = []
  const res = []
  while (root || q.length) {
    while (root) {
      res.push(root.val)
      q.push(root)
      root = root.left
    }
    const last = q.pop()
    root = last.right
  }
  return res
}
