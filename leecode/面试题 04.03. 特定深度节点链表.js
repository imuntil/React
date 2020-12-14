/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {TreeNode} tree
 * @return {ListNode[]}
 */

var listOfDepth = function(tree) {
  if (!tree) return []
  const res = []
  let q = [tree]
  while (q.length) {
    const temp = []
    let pre
    while (q.length) {
      const c = q.shift()
      const ln = new ListNode(c.val)
      if (!pre) {
        pre = ln
        res.push(pre)
      } else {
        pre.next = ln
        pre = ln
      }
      c.left && temp.push(c.left)
      c.right && temp.push(c.right)
    }
    q = temp
  }
  return res
}

function ListNode(val) {
  this.val = val
  this.next = null
}
