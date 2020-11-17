// [87,84,94,79,null,null,null,77,null,-82,null,70,null,38,null,36,45,22,null,null,null,18,24,14,null,null,null,8,null,-93,null,6,null,-37,null,-21,4,-32,null,null,null,-15,null,-42,null,-63,null,-70,null,-78,null,75,null,7,null,-96,null,-98]

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
  res2 = tr(node.right)
  if (!res1 || !res2) return false
  if (node.left) {
    const max = findMax(node.left)
    console.log(node.val, max)
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
