/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  if (!nums || !nums.length) return null
  return tr(nums, 0, nums.length - 1)
}

function tr(nums, start, end) {
  if (start > end) return null
  if (start === end) return new TreeNode(nums[start])
  const mid = Math.floor((end - start) / 2) + start
  const root = new TreeNode(nums[mid])
  root.left = tr(nums, start, mid - 1)
  root.right = tr(nums, mid + 1, end)
  return root
}

function TreeNode(val) {
  this.val = val
  this.left = this.right = null
}
