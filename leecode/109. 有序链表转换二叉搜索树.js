/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {ListNode} head
 * @return {TreeNode}
 */
var sortedListToBST = function (head) {
  if (!head) return null
  const nums = []
  while (head) {
    nums.push(head.val)
    head = head.next
  }

  const helper = (start, end) => {
    if (start === end) return new TreeNode(nums[start])
    if (start > end) return null
    const mid = (start + end) >> 1
    const root = new TreeNode(nums[mid])
    root.left = helper(start, mid - 1)
    root.right = helper(mid + 1, end)
    return root
  }

  return helper(0, nums.length - 1)
}

function TreeNode(val, left, right) {
  this.val = val === undefined ? 0 : val
  this.left = left === undefined ? null : left
  this.right = right === undefined ? null : right
}
