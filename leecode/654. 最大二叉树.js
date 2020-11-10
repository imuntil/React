/**
 * https://leetcode-cn.com/problems/maximum-binary-tree/
 *
 * Definition for a binary tree node.
 *
 */

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}

/**
 * @param {number[]} nums
 * @return {TreeNode}
 */

var findMax = function (nums, lo, hi) {
  // !!tip: lo >= hi
  if (lo >= hi) return -1
  let maxIndex = lo
  let max = nums[lo]
  for (let i = lo + 1; i < hi; i++) {
    if (nums[i] > max) {
      max = nums[i]
      maxIndex = i
    }
  }
  return maxIndex
}

var build = function (nums, lo, hi) {
  const rootIndex = findMax(nums, lo, hi)
  if (rootIndex === -1) return null
  const root = new TreeNode(nums[rootIndex])
  root.left = build(nums, lo, rootIndex)
  root.right = build(nums, rootIndex + 1, hi)
  return root
}

var constructMaximumBinaryTree = function (nums) {
  return build(nums, 0, nums.length)
}
