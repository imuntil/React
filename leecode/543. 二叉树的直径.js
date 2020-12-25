/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var diameterOfBinaryTree = function (root) {
  let res = 0
  const helper = (node) => {
    if (!node) return 0
    const leftLen = helper(node.left)
    const rightLen = helper(node.right)
    res = Math.max(res, leftLen + rightLen)
    return 1 + Math.max(leftLen, rightLen)
  }
  helper(root)
  return res
}
