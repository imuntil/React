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

// 广度优先
var minDepth = function (root) {
  if (!root) return 0
  const q = []
  let depth = 1
  q.push(root)
  while (q.length) {
    const size = q.length
    for (let i = 0; i < size; i++) {
      const cur = q.shift()
      cur.left && q.push(cur.left)
      cur.right && q.push(cur.right)
      if (!cur.left && !cur.right) {
        return depth
      }
    }
    depth++
  }
  return depth
}

// 深度优先
minDepth = function (root) {
  if (!root) return 0
  let res = Number.MAX_SAFE_INTEGER
  const dfs = (node, depth) => {
    if (node.left) {
      dfs(node.left, depth + 1)
    }
    if (node.right) {
      dfs(node.right, depth + 1)
    }
    if (!node.left && !node.right) {
      res = Math.min(res, depth)
    }
  }
  dfs(root, 1)
  return res
}
