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
var zigzagLevelOrder = function (root) {
  if (!root) return []
  const res = []
  let leftDir = true
  let arr = [root]
  while (arr.length) {
    const arr2 = []
    const temp = []
    while (arr.length) {
      const cur = arr.shift()
      temp[leftDir ? 'push' : 'unshift'](cur.val)
      cur.left && arr2.push(cur.left)
      cur.right && arr2.push(cur.right)
    }
    res.push(temp)
    arr = arr2
    leftDir = !leftDir
  }
  return res
}

zigzagLevelOrder = function (root) {
  if (!root) return []
  const res = []
  let leftDir = true
  let arr = [root]
  while (arr.length) {
    const arr2 = []
    const temp = Array(arr.length)
    let ix = leftDir ? 0 : arr.length - 1
    while (arr.length) {
      const cur = arr.shift()
      // temp[leftDir ? 'push' : 'unshift'](cur.val)
      temp[ix] = cur.val
      leftDir ? ix++ : ix--
      cur.left && arr2.push(cur.left)
      cur.right && arr2.push(cur.right)
    }
    res.push(temp)
    arr = arr2
    leftDir = !leftDir
  }
  return res
}
