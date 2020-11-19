/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  if ((p && !q) || (q && !p)) return false
  const [l1, l2] = [[], []]
  while (l1.length || p) {
    while (p) {
      if (!q) return false
      if (p.val !== q.val) return false
      l1.push(p)
      l2.push(q)
      p.visited = true
      p = p.left
      q = q.left
    }
    if (q) return false
    p = l1.pop()
    q = l2.pop()
    if (!p.visited && p.val !== q.val) return false
    p = p.right
    q = q.right
  }
  return true
}

// s2

isSameTree = function (p, q) {
  return tr(p, q)
}

function tr(r1, r2) {
  if (!r1 && !r2) return true
  if (r1 && r2) {
    if (r1.val !== r2.val) return false
    return tr(r1.left, r2.left) && tr(r1.right, r2.right)
  }
  return false
}
