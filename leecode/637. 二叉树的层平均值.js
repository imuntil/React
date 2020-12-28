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
var averageOfLevels = function (root) {
  let q = [root]
  let prevLen = 1
  const res = []
  while (q.length) {
    const temp = []
    let sum = 0
    while (q.length) {
      const { val, left, right } = q.shift()
      sum += val
      left && temp.push(left)
      right && temp.push(right)
    }
    q = temp
    res.push(sum / prevLen)
    prevLen = temp.length
  }
  return res
}
