/**
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 *
 * Definition for a binary tree node.
 */

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */

var findRoot = function (target, inorder, lo, hi) {
  for (let i = lo; i < hi; i++) {
    if (inorder[i] === target) {
      return i
    }
  }
}

var build = function (preorder, prelo, prehi, inorder, inlo, inhi) {
  const rootVal = preorder[prelo]
  const inorderRootIndex = findRoot(rootVal, inorder, lo, hi)
  // 左子树节点数
  const leftSize = inorderRootIndex - inlo
  const root = new TreeNode(rootVal)
  root.left = build(
    preorder,
    prelo + 1,
    prelo + 1 + leftSize,
    inorder,
    inlo,
    inlo + leftSize
  )
  root.right = build(
    preorder,
    prelo + 1 + leftSize,
    prehi,
    inorder,
    inorderRootIndex + 1,
    inhi
  )
  return root
}

var buildTree = function (preorder, inorder) {}
