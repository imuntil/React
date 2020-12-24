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
var largestValues = function (root) {
  if (!root) return []
  let q = [root]
  const res = []
  let depth = 0
  while (q.length) {
    const temp = []
    while (q.length) {
      const current = q.shift()
      const lineMax = res[depth]
      const { left, right, val } = current
      ;(val > lineMax || lineMax === undefined) && (res[depth] = val)
      left && temp.push(left)
      right && temp.push(right)
    }
    depth++
    q = temp
  }
  return res
}

largestValues = function (root) {
  if (!root) return []
  const res = []
  const helper = (node, depth) => {
    if (!node) return
    helper(node.left, depth + 1)
    helper(node.right, depth + 1)
    const rowMax = res[depth]
    if (node.val > rowMax || rowMax === undefined) {
      res[depth] = node.val
    }
  }
  helper(root, 0)
  return res
}
