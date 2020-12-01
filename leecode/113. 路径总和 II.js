/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {number} sum
 * @return {number[][]}
 * 
 * 回溯算法
 */
var pathSum = function (root, sum) {
  if (!root) return []
  const res = []
  const arr = [root.val]
  const helper = (node, val) => {
    if (!node.left && !node.right && val === sum) {
      res.push([...arr])
      return
    }
    for (let n of [node.left, node.right]) {
      if (!n) continue
      arr.push(n.val)
      val += n.val
      helper(n, val)
      arr.pop()
      val -= n.val
    }
  }
  helper(root, root.val)
  return res
}
