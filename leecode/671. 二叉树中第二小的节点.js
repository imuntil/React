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
var findSecondMinimumValue = function (root) {
  let q = [root]
  const rootVal = root.val
  let res = Number.MAX_SAFE_INTEGER
  while (q.length) {
    const temp = []
    let allOver = true
    while (q.length) {
      const cur = q.shift()
      const { val, left, right } = cur
      if (val !== rootVal) {
        res = Math.min(res, val)
      } else {
        allOver = false
      }
      left && temp.push(left)
      right && temp.push(right)
    }
    if (allOver) break
    q = temp
  }
  return res === Number.MAX_SAFE_INTEGER ? -1 : res
}
