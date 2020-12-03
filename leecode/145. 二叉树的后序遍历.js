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
var postorderTraversal = function (root) {
  let q = []
  let lastVisited = null
  const res = []
  while (root || q.length) {
    while (root) {
      q.push(root)
      root = root.left
    }
    let temp = q[q.length - 1]
    if (!temp.right || temp.right === lastVisited) {
      res.push(temp.val)
      lastVisited = temp
      q.pop()
    } else {
      root = temp.right
    }
  }
  return res
}
