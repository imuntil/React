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
 * @param {number} sum
 * @return {number}
 */
var pathSum = function (root, sum) {
  let res = 0
  const helper = (node) => {
    if (!node) return []
    const l = helper(node.left)
    const r = helper(node.right)
    if (node.val === sum) {
      res++
    }
    const childrens = [...l, ...r].map((v) => {
      const csum = v + node.val
      if (csum === sum) res++
      return csum
    })
    return [node.val, ...childrens]
  }
  helper(root)
  return res
}
