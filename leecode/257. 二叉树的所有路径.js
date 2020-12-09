/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[]}
 */
var binaryTreePaths = function (root) {
  if (!root) return []
  const res = []
  const helper = (node, str) => {
    const { left, right } = node
    if (!left && !right) {
      res.push(str)
      return
    }
    left && helper(left, str + '->' + left.val)
    right && helper(right, str + '->' + right.val)
  }
  helper(root, '' + root.val)
  return res
}
