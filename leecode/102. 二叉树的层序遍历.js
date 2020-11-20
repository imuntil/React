/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (!root) return []
  const q = [root]
  const res = []
  let temp = []
  let count = 1
  while (q.length) {
    const current = q.shift()
    temp.push(current.val)
    if (temp.length === count) {
      res.push(temp)
      temp = []
      count = 0
    }
  }
}
