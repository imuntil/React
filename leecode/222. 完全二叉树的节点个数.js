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
var countNodes = function (root) {
  if (!root) return 0
  let depth = 0
  let x = root
  while (x) {
    depth++
    x = x.right
  }
  let count = 0
  const helper = (node, d) => {
    if (!node.left && !node.right) {
      if (d === depth) return true
      count++
    }
    d++
    if (node.left) {
      const res = helper(node.left, d)
      if (res) return true
    }
    if (node.right) {
      const res = helper(node.right, d)
      if (res) return true
    }
  }
  helper(root, 1)
  return count + Math.pow(2, depth) - 1
}

countNodes = function (root) {
  const helper = (node) => {
    if (!node) return 0
    return 1 + helper(node.left) + helper(node.right)
  }
  return helper(root)
}

// 二分