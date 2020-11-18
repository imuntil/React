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
  return helper(root, Number.MAX_SAFE_INTEGER, Number.MIN_SAFE_INTEGER)
}

function helper(root, upper, lower) {
  if (!root) return true
  if (root.val >= upper || root.val <= lower) return false
  return (
    helper(root.left, root.val, lower) && helper(root.right, upper, root.val)
  )
}

// 双while循环的中序遍历
isValidBST = function (root) {
  let queue = []
  let preVal = Number.MIN_SAFE_INTEGER
  while (queue.length || root !== null) {
    while (root !== null) {
      queue.push(root)
      root = root.left
    }
    root = queue.pop()
    if (root.val <= preVal) return false
    preVal = root.val
    root = root.right
  }
  return true
}
