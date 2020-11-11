/**
 * https://leetcode-cn.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/
 *
 * Definition for a binary tree node.
 *    2
 *   / \
 *  9  20
 *     /\
 *    1  3
 * preorder = [2,9,20,1,3]
 * inorder  = [9,2,1,20,3]
 *
 * preorder[0] 为整个树的root节点，由于树中节点全部唯一，所以可以在inorder中找到root节点, 设下标为index，root节点左侧则为左子树 leftTree, 右侧为右子树 rightTree
 * leftTree : inorder[0, index) && preorder[0 + 1, 0 + 1 + leftTree.size)
 * rightTree: inorder[index + 1, inorder.length) && preorder[1 + leftTree.size + 1, preorder.length)
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
  // !!tip: 终结条件
  // 由上面的解析，可知中序遍历的范围时前闭后开的（主要还是用实例分析得到的=。=）
  if (inlo >= inhi) {
    return null
  }
  const rootVal = preorder[prelo]
  const inorderRootIndex = findRoot(rootVal, inorder, inlo, inhi)
  // 左子树节点数
  const leftSize = inorderRootIndex - inlo
  const root = new TreeNode(rootVal)
  root.left = build(
    preorder,
    prelo + 1,
    // 后开
    prelo + 1 + leftSize,
    inorder,
    inlo,
    inlo + leftSize
  )
  root.right = build(
    preorder,
    prelo + 1 + leftSize,
    // 后开
    prehi,
    inorder,
    inorderRootIndex + 1,
    inhi
  )
  return root
}

var buildTree = function (preorder, inorder) {
  // 前闭后开
  return build(preorder, 0, preorder.length, inorder, 0, inorder.length)
}
