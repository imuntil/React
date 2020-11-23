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

  const compare = function () {
    if (temp.length === count) {
      temp.length && res.push(temp)
      count = 2 * temp.length
      temp = []
    }
  }
  while (q.length) {
    const current = q.shift()
    if (!current) {
      count--
      compare()
      continue
    }
    temp.push(current.val)
    compare()

    q.push(current.left)
    q.push(current.right)
  }

  return res
}
