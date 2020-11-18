/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var recoverTree = function (root) {
  if (!root) return null
  const rootCopy = root
  const queue = []
  let preNode = new TreeNode(Number.MIN_SAFE_INTEGER)
  let t = []

  while (root || queue.length) {
    while (root) {
      queue.push(root)
      root = root.left
    }

    root = queue.pop()

    if (root.val <= preNode.val) {
      t = [...t, preNode, root]
      if (t.length === 4) break
      if (t[2] && t[2] === t[1]) break
    }

    preNode = root
    root = root.right
  }

  // xxxxx wrong!!!!!!!
  // const x = t[0]
  // const y = t[t.length - 1]
  // const { left, right } = x
  // x.left = y.left
  // x.right = y.right
  // y.left = left
  // y.right = right

  return rootCopy.val === x.val ? y : rootCopy
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
