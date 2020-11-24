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
var levelOrderBottom = function (root) {
  if (!root) return []
  const res = []
  let arr = [root]
  while (arr.length) {
    const temp = []
    const arr2 = []
    while (arr.length) {
      const cur = arr.shift()
      temp.push(cur.val)
      cur.left && arr2.push(cur.left)
      cur.right && arr2.push(cur.right)
    }
    arr = arr2
    res.unshift(temp)
  }
  return res
}
