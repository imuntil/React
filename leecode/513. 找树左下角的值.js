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
var findBottomLeftValue = function (root) {
  let q = [root]
  let res
  while (q.length) {
    const temp = []
    res = q[0]
    while (q.length) {
      const current = q.shift()
      const { left, right } = current
      left && temp.push(left)
      right && temp.push(right)
    }
    q = temp
  }
  return res.val
}

// dfs
findBottomLeftValue = function (root) {
  let res,
    maxDepth = 0
  const helper = (node, depth) => {
    if (!node) return
    helper(node.left, depth + 1)
    helper(node.right, depth + 1)
    if (maxDepth < depth) {
      maxDepth = depth
      res = node
    }
  }
  helper(root, 1)
  return res.val
}
