/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  if (!root) return []
  let q = [root]
  const res = []
  while (q.length) {
    const temp = []
    const last = q[q.length - 1]
    res.push(last.val)
    while (q.length) {
      const cur = q.shift()
      cur.left && temp.push(cur.left)
      cur.right && temp.push(cur.right)
    }
    q = temp
  }
  return res
}
