/**
 * Definition for a binary tree node.
 * https://leetcode-cn.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/
 */
/**
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

var findRoot = function (target, inorder, inStart, inEnd) {
  for (let i = inStart; i <= inEnd; i++) {
    if (target === inorder[i]) {
      return i
    }
  }
}

var build = function (inorder, inStart, inEnd, postorder, postStart, postEnd) {
  // 前闭后闭
  if (inEnd < inStart) return null
  const target = postorder[postEnd]
  const rootIndex = findRoot(target, inorder, inStart, inEnd)
  const leftSize = rootIndex - inStart
  const root = new TreeNode(target)
  root.left = build(
    inorder,
    inStart,
    inStart + leftSize - 1,
    postorder,
    postStart,
    postStart + leftSize - 1
  )
  root.right = build(
    inorder,
    rootIndex + 1,
    inEnd,
    postorder,
    postStart + leftSize,
    postEnd - 1
  )
  return root
}

var buildTree = function (inorder, postorder) {
  // 前闭后闭
  return build(
    inorder,
    0,
    inorder.length - 1,
    postorder,
    0,
    postorder.length - 1
  )
}
