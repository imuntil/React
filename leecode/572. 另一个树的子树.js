/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} s
 * @param {TreeNode} t
 * @return {boolean}
 */
var isSubtree = function (s, t) {
  let found = false
  const compare = (sc, tc) => {
    if (!sc && !tc) return true
    if ((sc && !tc) || (tc && !sc)) return false
    if (sc.val !== tc.val) return false
    const ls = compare(sc.left, tc.left)
    const rs = compare(sc.right, tc.right)
    return ls && rs
  }
  const helper = (node) => {
    if (!node || found) return
    found = compare(node, t)
    if (!found) {
      helper(node.left)
      helper(node.right)
    }
  }
  helper(s)
  return found
}
