/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var findMode = function (root) {
  if (!root) return []
  let res = []
  let preNode = { val: null, count: 0 }

  const calc = () => {
    const len = res.length
    const { count } = preNode
    const maxCount = len ? res[len - 1].count : 0
    if (!len || maxCount === count) {
      res.push(preNode)
    } else if (maxCount < count) {
      res = [preNode]
    }
  }
  const helper = (node) => {
    if (!node) return
    helper(node.left)
    if (node.val !== preNode.val) {
      calc()
      preNode = { val: node.val, count: 1 }
    } else {
      preNode.count++
    }
    helper(node.right)
  }
  helper(root)
  calc()
  return res.map((v) => v.val)
}
