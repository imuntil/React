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
 * 回溯算法
 */
var sumNumbers = function (root) {
  if (!root) return 0
  let res = 0
  const temp = [root.val]
  const helper = (node) => {
    if (!node.left && !node.right) {
      const num = +temp.join('')
      res += num
      return
    }
    const q = [node.left, node.right]
    for (let n of q) {
      if (!n) continue
      temp.push(n.val)
      helper(n)
      temp.pop()
    }
  }
  helper(root)
  return res
}
