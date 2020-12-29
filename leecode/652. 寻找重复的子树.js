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
 * @return {TreeNode[]}
 */
var findDuplicateSubtrees = function (root) {
  if (!root) return []
  const map = {}
  const res = []
  const helper = (node, str) => {
    if (!node) return
    if (!node.left && !node.right) {
      // 用字符串不行
      str = ''
    }
    str += node.val

    helper(node.left, str)
    helper(node.right, str)

    if (!map[str]) {
      map[str] = 0
    }
    map[str]++
    if (map[str] === 2) {
      res.push(node)
    }
  }
  helper(root, '')
  return res
}
