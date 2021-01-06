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
    while (q.length) {
      const cur = q.shift()
      const { left, right, ix } = cur
      if (left) {
        temp.push(left)
        left.ix = 2 * ix
      }
      if (right) {
        temp.push(right)
        right.ix = 2 * ix + 1
      }
    }
    // console.log(temp)
    let min = 0
    let len = temp.length
    for (let i = 0; i < len; i++) {
      console.log(temp[i].val, temp[i].ix)
      if (i === 0) {
        min = temp[i].ix
      }
      if (min !== 0) {
        temp[i].ix -= min
      }
      if ((i = len - 1)) {
        res = Math.max(res, temp[i].ix + 1)
      }
    }
    q = temp
  }
  return res
}


// [4,1,2,null,null,5,3]