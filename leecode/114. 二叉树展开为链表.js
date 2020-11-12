/**
 * Definition for a binary tree node.
 * https://leetcode-cn.com/problems/flatten-binary-tree-to-linked-list/
 */
/**
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}

var flatten = function (root) {
  if (!root) return null
  flatten(root.left)
  flatten(root.right)
  const temp = root.right
  root.right = root.left
  root.left = null
  let parent = root
  while (parent.right) {
    parent = parent.right
  }
  parent.right = temp
  return root
}

