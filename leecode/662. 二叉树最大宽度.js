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
var widthOfBinaryTree = function (root) {
  if (!root) return 0
  let q = [root]
  root.ix = 0
  let res = 1
  while (q.length) {
    const temp = []
    let startIx = null
    while (q.length) {
      const cur = q.shift()
      const { left, right, ix } = cur

      if (left) {
        temp.push(left)
        if (startIx === null) {
          startIx = 2 * ix
        }
        left.ix = 2 * ix - startIx
      }
      if (right) {
        temp.push(right)
        if (startIx === null) {
          startIx = 2 * ix + 1
        }
        right.ix = 2 * ix + 1 - startIx
      }
    }
    if (temp.length) {
      res = Math.max(res, temp[temp.length - 1].ix + 1)
    }
    q = temp
  }
  return res
}
