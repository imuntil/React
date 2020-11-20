/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (!root) return true
  const q = [[root.left, root.right]]
  while (q.length) {
    const [x, y] = q.shift()
    if (!x && !y) continue
    if (!(x && y)) return false
    if (x.val !== y.val) return false
    q.push([x.left, y.right])
    q.push([x.right, y.left])
  }
  return true
}

isSymmetric = function (root) {
  if (!root) return true
  const tr = function (left, right) {
    if (!left && !right) return true
    if (!(left && right)) return false
    if (left.val !== right.val) return false
    return tr(left.left, right.right) && tr(left.right, right.left)
  }
  return tr(root.left, root.right)
}
