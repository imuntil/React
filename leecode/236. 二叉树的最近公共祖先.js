/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (p.val === q.val) return p
  let mark
  let res = null
  const helper = (node) => {
    if (!node || res) return
    helper(node.left)
    if (mark && (node.val === q.val || node.val === p.val)) {
      res = mark
      return
    }
    if (node.val === p.val || node.val === q.val) {
      mark = node
    } else if (node.left === mark || node.right === mark) {
      mark = node
    }
    helper(node.right)
  }
  helper(root)
  return res
}
