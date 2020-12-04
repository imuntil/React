/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var rightSideView = function (root) {
  const res = []
  const helper = (node, depth) => {
    if (!node) return
    if (res[depth] === undefined) {
      res[depth] = node.val
    }
    depth++
    helper(node.right, depth)
    helper(node.left, depth)
  }
  helper(root, 0)
  return res
}
