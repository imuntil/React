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
var isValidBST = function (root) {
  return tr(root)
}

function tr(node) {
  if (!node) return true
  res1 = tr(node.left)
  if (!res1) return false
  res2 = tr(node.right)
  if (!res2) return false
  if (node.left) {
    const max = findMax(node.left)
    if (node.val <= max) return false
  }
  if (node.right) {
    const min = findMin(node.right)
    if (node.val >= min) return false
  }
  return true
}

function findMin(node) {
  while (node.left) {
    node = node.left
  }
  return node.val
}

function findMax(node) {
  while (node.right) {
    node = node.right
  }
  return node.val
}
