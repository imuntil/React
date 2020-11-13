/**
 * Definition for a binary tree node.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

function gen(list, low, high, p, d, root, count, res) {
  if (low > high) {
    if (root.size === list.length && d === 'right') {
      res.push(JSON.stringify(root))
    }
    return null
  }
  count++
  for (let i = low; i <= high; i++) {
    const node = new TreeNode(list[i])
    p ? (p[d] = node) : (root = node)
    root.size = (root.size || 0) + 1
    gen(list, low, i - 1, node, 'left', root, count, res)
    gen(list, i + 1, high, node, 'right', root, count, res)
    p && (p[d] = null)
    root.size--
  }
}

/**
 * @param {number} n
 * @return {TreeNode[]}
 */
var generateTrees = function (n) {
  const res = []
  const list = Array(n)
    .fill('')
    .map((_, ix) => ix + 1)
  gen(list, 0, list.length - 1, null, null, null, 0, res)
  return res.map((v) => JSON.parse(v))
}
