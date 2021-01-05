/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {string[][]}
 */

function getTreeLen(root, len) {
  if (!root) return len
  const leftLen = getTreeLen(root.left, len + 1)
  const rightLen = getTreeLen(root.right, len + 1)
  return Math.max(leftLen, rightLen)
}

var printTree = function (root) {
  const depth = getTreeLen(root, 0)
  const width = Math.pow(2, depth) - 1
  const mn = Array(depth)
    .fill('')
    .map(() => Array(width).fill(''))
  const helper = (node, d, start, end) => {
    if (!node) return
    const mid = (start + end) >> 1
    mn[d][mid] = node.val + ''
    helper(node.left, d + 1, start, mid - 1)
    helper(node.right, d + 1, mid + 1, end)
  }
  helper(root, 0, 0, width - 1)
  return mn
}
